import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, jwt, sign, verify } from 'hono/jwt'

 
export const blogRouter  = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET: string,
         },
         Variables: {
          userId: string
         }
}>()
// middleaware for the bunch of prechecks before forwarding to the end points
/* blogRouter.use('/*', async(c, next) => {
  // middleware will extract te user id and pass it down to route handler
  // get the header
  //verify the header
  // if the header is corerect then proced to next
  // if not wer return the user a 403
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1] // Bearer + token
  const response = await verify(token, c.env.JWT_SECRET)
  if( response.id ){ // since sign our jwt token with the id 
    next()
  } else {
    c.status(403)
    return c.json({error : "unauthorized access"}
    )}})*/

  blogRouter.use('/*', async(c, next) => {
    console.log("middleware")
    const authHeader = c.req.header("authorization") || ""; // if no header is passed te type of header is empty string so it will not give the typw error
    console.log(authHeader) 
    try{
    console.log("inside try block in middleware")
    const user = await verify(authHeader, c.env.JWT_SECRET) as { id: string } // token has all the information of the payload

    if(user){
      c.set("userId", user.id)  // comes for jwt payload user.id
      await next()
    }else{
      c.status(403)
     return c.json({
        meassage: "unauthorized access"
      })
    }
   } catch(e){
    c.status(403)
   return  c.json({
      meassage: "unauthorized access"
    })
   }

    
  })

// pahle JWT payload se extract karenge userid fir us user id ko autor id ke equal kardenge 
blogRouter.post('/', async(c) => { // to create a blog
  const body = await c.req.json()
   const authId = c.get("userId")
    const prisma = new PrismaClient({
   datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   const post =  await prisma.post.create({ // to create blog
      data: {
        title: body.title,
        content: body.content,
        authorId: authId,
      
      }
    })
    return c.json({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt, // Include createdAt in the response
    })  
  })
  
  
blogRouter.put('/', async(c) =>  { // to update the title and athe description
  const body = await c.req.json() //returns a promise so will have to await the promise
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
   const post =  await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content
      }
    })
    
    return c.json({
      id: post.id
    })

  })
    // pagination ie first 10 blogs bulk is before
blogRouter.get('/bulk', async(c) => {
 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const post = await prisma.post.findMany({
    select: {  // select will tell us which all things will the backend return to us
      content: true,
      title: true,
      id: true,
      createdAt: true,
   
      author: {
        select: {
          name: true
        }
      }
    }
  })
   return c.json({
    post
   })
  })   
          
blogRouter.get('/:id',async (c) => { // to get a blog never use body in a GET request
  const id =  c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const post = await prisma.post.findFirst({
      where: {
        id: id
      },
      select:{
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })
    return c.json({
      post
    })
  }catch(e){
    c.status(411)
    return c.json({
      message: "Error while fetching the blog Post"
    })
  }
  
  })
// Define the DELETE endpoint
blogRouter.delete('/delete/:id', async (c) => {
  const id = c.req.param("id"); // Extract post ID from request parameters

  // Initialize Prisma Client with Accelerate
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    // Delete the post with the given ID
    await prisma.post.delete({
      where: {
        id: id
      }
    });

    // Return a success response
    return c.json({
      message: "Post deleted successfully"
    });
  } catch (e) {
    console.error(e); // Log error for debugging

    // Return an error response if something goes wrong
    c.status(500);
    return c.json({
      message: "Error while deleting the blog post"
    });
  }
});



blogRouter.get('/userposts', async (c) => {
  const autherId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL
  }).$extends(withAccelerate())
  try{
  const posts = await prisma.post.findMany({
    where:{
      authorId: autherId
    },
   
  })
  return c.json(posts)
  }catch(e){
c.status(400)
return c.json({
  message: "Error while returning the posts "
})
  }
});
