import KoaRouter from 'koa-router';
import RoomController from './controller/RoomController';
import UserController from './controller/UserController';
import BookController from './controller/BookController';
import BookControllerValidators from './controller/BookControllerValidators';

const router = new KoaRouter();

async function controllerExecutor(ctx, fn) {
	const data = { ...ctx.request.body, ...ctx.params, ...ctx.query };
	const result = await fn(data);
	ctx.body = result;
	ctx.status = 200;
}

function validateBody(ctx, validatorSchema, next) {
	const validation = validatorSchema.validate(ctx.request.body);
	if (validation?.error?.details) {
		throw { ...validation, isJoi: true };
	}
	return next();
}

router.get('/user/:id', async (ctx) => {
	await controllerExecutor(ctx, UserController.get);
});
router.get('/rooms', async (ctx) => {
	await controllerExecutor(ctx, RoomController.get);
});
router.post(
	'/book',
	(ctx, next) => validateBody(ctx, BookControllerValidators.create, next),
	async (ctx) => {
		await controllerExecutor(ctx, BookController.create);
	}
);
router.put(
	'/book',
	(ctx, next) => validateBody(ctx, BookControllerValidators.update, next),
	async (ctx) => {
		await controllerExecutor(ctx, BookController.update);
	}
);

export default router;
