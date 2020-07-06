import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import BusinessSystem from './services/businessSystem'

export const app = new Koa();
const router = new Router();
const service = new BusinessSystem();
// router.get('/', async (ctx: Koa.Context) => {
//   const name = ctx.query.name || 'stranger'
//   ctx.body = {
//     message: `Hello, ${name}!`,
//   }
// })
router.get('/users', async(ctx: Koa.Context)=>{
  service.Type = "users"
  await service.RetrieveAll().then(res=>{
    ctx.body ={res};
  })
  
})
router.get('/users/:id', async(ctx: Koa.Context)=>{
  service.Type = "users";
  const id = ctx.captures[0];
  await service.Retrieve(id).then(res=>{
    ctx.body ={res};
  })
  
})
router.post('/users', async(ctx: Koa.Context)=>{
  service.Type = "users"
  await service.Create(ctx.request.body).then(res=>{
    ctx.body ={res};
  })
  
})
router.put('/users', async(ctx: Koa.Context)=>{
  service.Type = "users";
  await service.Update(ctx.request.body).then(res=>{
    ctx.body ={res};
  })
  
})
router.delete('/users/:id', async(ctx: Koa.Context)=>{
  service.Type = "users";
  const id = ctx.captures[0];
  await service.Delete(id).then(res=>{
    ctx.body ={res};
  })
})
router.get('/cars', async(ctx: Koa.Context)=>{
  service.Type = "cars";
  await service.RetrieveAll().then(res=>{
    ctx.body ={res};
  })
})
router.get('/cars/:id', async(ctx: Koa.Context)=>{
  service.Type = "cars";
  const id = ctx.captures[0];
  await service.Retrieve(id).then(res=>{
    ctx.body ={res};
  })  
})
router.post('/cars', async(ctx: Koa.Context)=>{
  service.Type = "cars";
  await service.Create(ctx.request.body).then(res=>{
    ctx.body ={res};
  })
})
router.put('/cars', async(ctx: Koa.Context)=>{
  service.Type = "cars";
  const id = ctx.captures[0];
  await service.Update(ctx.request.body).then(res=>{
    ctx.body ={res};
  })
})
router.delete('/cars/:id', async(ctx: Koa.Context)=>{
  service.Type = "cars";
  const id = ctx.captures[0];
  await service.Delete(id).then(res=>{
    ctx.body ={res};
  })
})
app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
