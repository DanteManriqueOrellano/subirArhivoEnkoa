"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDashboardView = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const services_1 = require("../images/services");
const services_2 = require("../auth/services");
const router = new koa_router_1.default();
router.use(services_2.ensureLoggedIn);
/*
  Opens a dashboard.handlebars template file and converts it to HTML string.
  That HTML is eventually sent to the browser as response body.
 */
function renderDashboardView(context) {
    const viewAbsolutePath = path_1.default.join(__dirname, 'dashboard.handlebars');
    const renderView = handlebars_1.default.compile(fs_1.default.readFileSync(viewAbsolutePath, { encoding: 'utf8' }));
    return renderView(context);
}
exports.renderDashboardView = renderDashboardView;
router.get('/', ctx => {
    const images = services_1.getUsersImagesData(services_2.getUserId(ctx));
    ctx.body = renderDashboardView({ images });
});
exports.default = app => app.use(router.routes());
//# sourceMappingURL=dashboard-controller.js.map