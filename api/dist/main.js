"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const businessSystem_1 = __importDefault(require("./services/businessSystem"));
exports.app = new koa_1.default();
const router = new koa_router_1.default();
const service = new businessSystem_1.default();
// router.get('/', async (ctx: Koa.Context) => {
//   const name = ctx.query.name || 'stranger'
//   ctx.body = {
//     message: `Hello, ${name}!`,
//   }
// })
router.get('/users', async (ctx) => {
    service.Type = "users";
    await service.RetrieveAll().then(res => {
        ctx.body = { res };
    });
});
router.get('/users/:id', async (ctx) => {
    service.Type = "users";
    const id = ctx.captures[0];
    await service.Retrieve(id).then(res => {
        ctx.body = { res };
    });
});
router.post('/users', async (ctx) => {
    service.Type = "users";
    await service.Create(ctx.request.body).then(res => {
        ctx.body = { res };
    });
});
router.put('/users', async (ctx) => {
    service.Type = "users";
    await service.Update(ctx.request.body).then(res => {
        ctx.body = { res };
    });
});
router.delete('/users/:id', async (ctx) => {
    service.Type = "users";
    const id = ctx.captures[0];
    await service.Delete(id).then(res => {
        ctx.body = { res };
    });
});
router.get('/cars', async (ctx) => {
    service.Type = "cars";
    await service.RetrieveAll().then(res => {
        ctx.body = { res };
    });
});
router.get('/cars/:id', async (ctx) => {
    service.Type = "cars";
    const id = ctx.captures[0];
    await service.Retrieve(id).then(res => {
        ctx.body = { res };
    });
});
router.post('/cars', async (ctx) => {
    service.Type = "cars";
    await service.Create(ctx.request.body).then(res => {
        ctx.body = { res };
    });
});
router.put('/cars', async (ctx) => {
    service.Type = "cars";
    const id = ctx.captures[0];
    await service.Update(ctx.request.body).then(res => {
        ctx.body = { res };
    });
});
router.delete('/cars/:id', async (ctx) => {
    service.Type = "cars";
    const id = ctx.captures[0];
    await service.Delete(id).then(res => {
        ctx.body = { res };
    });
});
exports.app
    .use(cors_1.default())
    .use(koa_logger_1.default())
    .use(koa_bodyparser_1.default())
    .use(router.routes())
    .use(router.allowedMethods());
//# sourceMappingURL=main.js.map