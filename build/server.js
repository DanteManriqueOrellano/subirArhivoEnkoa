"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const koa_router_1 = __importDefault(require("koa-router"));
const app = new koa_1.default();
const port = process.env.PORT || 3000;
var controlador = '**/*-controller.ts';
app.use(koa_bodyparser_1.default());
const router = new koa_router_1.default();
if (port !== 3000) {
    controlador = '**/*-controller.js';
}
const controllersRegistrators = glob_1.default.sync(path_1.default.join(__dirname, controlador))
    .map(controllerPath => require(controllerPath))
    .map(controller => controller.default);
for (const registerController of controllersRegistrators) {
    registerController(app);
}
router.get('/hola', ctx => {
    ctx.body = "hola";
});
app.use(router.routes());
app.listen(port, () => console.log(`server runnning at ${port}`));
//# sourceMappingURL=server.js.map