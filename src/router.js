import KoaRouter from 'koa-router';
import KoaValidator from 'koa2-joi-validate';
import RoomController from './controller/RoomController';
import RoomControllerValidators from './controller/RoomControllerValidators';

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

router.get('/rooms/:id', validator.params(RoomControllerValidators.get), async (ctx) => {
  await controllerExecutor(ctx, RoomController.get);
});
router.post('/rooms', validator.body(RoomControllerValidators.create), async (ctx) => {
  await controllerExecutor(ctx, RoomController.create);
})

export default router;