"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const koa_router_1 = __importDefault(require("koa-router"));
const multer_1 = __importDefault(require("@koa/multer"));
const services_1 = require("./services");
const services_2 = require("../auth/services");
const router = new koa_router_1.default();
router.use(services_2.ensureLoggedIn); //garantiza que se mantenga el valor del usuario logado,  es el middleware
router.get('/images/:imageName', ctx => {
    const { imageName } = ctx.params;
    const userId = services_2.getUserId(ctx);
    //ctx.set('Content-type', 'image/jpeg');//funciona para imagenes
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.body = fs_1.default.createReadStream(services_1.getImagePath(userId, imageName));
});
const uploadMiddleware = multer_1.default().fields([{ name: 'file', maxCount: 1 }]);
router.post('/images', uploadMiddleware, ctx => {
    const id = services_2.getUserId(ctx);
    const { name } = ctx.request.body;
    if (!name) {
        ctx.body = 'Missing name';
        return;
    }
    console.log(ctx.files.file[0].originalname);
    services_1.saveImage(id, ctx.files.file[0].originalname, ctx.files.file[0].buffer);
    ctx.redirect('/');
});
router.post('/images/actions/delete/:imageName', ctx => {
    const { imageName } = ctx.params;
    const userId = services_2.getUserId(ctx);
    services_1.deleteImage(userId, imageName);
    ctx.redirect('/');
});
exports.default = app => app.use(router.routes());
//# sourceMappingURL=image-controller.js.map