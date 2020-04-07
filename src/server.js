import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import serve from 'koa-static';
import mount from 'koa-mount';
import router from './router';

const app = new Koa();

function handleError(err, context) {
  if(err.message.isJoi) {
    context.status = 400;
    context.body = {
      message: err.message.details[0].message,
      extra: err.message.details,
    }
  } else {
    context.status = err.status || 500;
    context.body = {
      message: err.message || 'Unhandled error',
      extra: err.extra,
    };
  }
}

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/frontend/build")); //serve the build directory
app.use(mount("/", static_pages));
app.use(cors());
app.use(bodyParser());
app.use((context, next) => next().catch((err) => handleError(err, context)));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;