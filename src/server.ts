import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import glob from 'glob';
import Router from 'koa-router'
const app = new Koa<any>();
const port = process.env.PORT || 3000;
var controlador = '**/*-controller.ts'
app.use(bodyParser());
const router = new Router()
if (port !== 3000) {
    controlador = '**/*-controller.js'
}

const controllersRegistrators =
    glob.sync(path.join(__dirname, controlador))
        .map(controllerPath => require(controllerPath))
        .map(controller => controller.default);

for (const registerController of controllersRegistrators) {
    registerController(app);
}

router.get('/hola', ctx => {
    ctx.body ="hola"
})

app.use(router.routes())
app.listen(port, () => console.log(`server runnning at ${port}`))