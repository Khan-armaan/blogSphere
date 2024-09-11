import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'  // used in connection pool prisma accelerate
import { decode, jwt, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'




const app = new Hono<{ // because of typescripts type specific errors specify all the environment variables 
  Bindings: {
    DATABASE_URL: string,// type script dosent know about the wrangler.toml file environment variable so need to describe inside the hono
    JWT_SECRET : string
  }
}> ()
app.use('/*', cors()) // to implement cors

app.route("api/v1/user", userRouter)
app.route("api/v1/blog", blogRouter)





// middleaware for the bunch of prechecks before forwarding to the end points




export default app
