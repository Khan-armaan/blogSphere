import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'  // used in connection pool prisma accelerate
import { decode, jwt, sign, verify } from 'hono/jwt'
import { signupInput } from "@armaankhan0/common";
import { string, tuple } from "zod";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,// type script dosent know about the wrangler.toml file environment variable so need to describe inside the hono
            JWT_SECRET : string
        }
}>();

userRouter.post('/signup', async(c) => {  // crating a new client for every api request
  const body =  await c.req.json()
 
  const { success } = signupInput.safeParse(body)
  
  if(!success){
    c.status(411)
    return c.json({
      message: "Inputs are not correct"
    })
  } 
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL, // enviroment variable using c  context
  }).$extends(withAccelerate()) // ACCELERATE because of connection pooling
   // convert the data to the json you haven toa await it since .json() returns a promise 
  
  try{
    const user = await prisma.user.create({ //got back the user object from here
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
     })
     
     const token = await sign({id: user.id}, c.env.JWT_SECRET)
     console.log(token)
     return c.json(
       token  // signup request returning a jwt token
      )
  } catch(e){
    console.log(e)
    c.status(403);
          return c.json({ error: "error while signing up" });
  }
  })
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    const body = await c.req.json()
    const user = await prisma.user.findFirst({
      // @ts-ignore
      where: {
        email : body.email,
        password: body.password,
      }
    })
    if(!user){
      c.status(403)  // 403 unauthorized access
      return c.json({error : "user not found"})
    }
    const jwt = await sign({id : user.id}, c.env.JWT_SECRET)
    return c.json(jwt)
  })

  userRouter.get('/me', async (c) => { 
    const token = c.req.header('Authorization') 
    if (!token) {
        c.status(401);
        return c.json({ error: "Authorization token missing" });
    } 

    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        const Id = payload.id as string ;

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const user = await prisma.user.findFirst({
            where: {
                id: Id,
            },
            select: {
              id: true,
                name: true,
                email: true,
                posts: true
            },
        });

        if (!user) {
            c.status(404);
            return c.json({ error: "User not found" });
        }

        return c.json({user});
    } catch (e) {
        c.status(401);
        return c.json({ error: "Invalid token" });
    }
});
userRouter.get('/userposts', async(c) => {
  const token = c.req.header("authorization");
  if (!token){
    c.status(401)
    return c.json({
      message: 'Invalid authorizaion'
    })
  }
 
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    const Id = payload.id as string ;

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findFirst({
        where: {
            id: Id,
        },
        select: {
            posts: {
              select:{
                title: true,
                id:true
              }
            }
        },
    });

    if (!user) {
        c.status(404);
        return c.json({ error: "User not found" });
    }

    return c.json(user);
} catch (e) {
    c.status(401);
    return c.json({ error: "Invalid token" });
}
})

