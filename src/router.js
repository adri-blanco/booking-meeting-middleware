import KoaRouter from 'koa-router';
import KoaValidator from 'koa2-joi-validate';
import RoomController from './controller/RoomController';
import UserController from './controller/UserController';
import UserControllerValidators from './controller/UserControllerValidators';

const router = new KoaRouter();
const validator = KoaValidator({
  passError: true,
});

async function controllerExecutor(ctx, fn) {
  const data = { ...ctx.request.body, ...ctx.params, ...ctx.query };
  const result = await fn(data);
  ctx.body = result;
  ctx.status = 200;
}

router.get('/user/:id', validator.params(UserControllerValidators.get), async (ctx) => {
  await controllerExecutor(ctx, UserController.get);
});
router.get('/rooms', async (ctx) => {
  await controllerExecutor(ctx, RoomController.get);
})

export default router;