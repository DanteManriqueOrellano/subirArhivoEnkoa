"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveExcel = exports.deleteImage = exports.getUsersImagesData = exports.saveImage = exports.getUsersImagesNames = exports.getImageUrl = exports.getImagePath = exports.getUserUploadsDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getUserUploadsDirectory(userId) {
    const userDirectory = path_1.default.join(__dirname, 'uploads', userId);
    fs_1.default.mkdirSync(userDirectory, { recursive: true });
    return userDirectory;
}
exports.getUserUploadsDirectory = getUserUploadsDirectory;
function getImagePath(userId, imageName) {
    return path_1.default.join(getUserUploadsDirectory(userId), imageName);
}
exports.getImagePath = getImagePath;
function getImageUrl(imageName) {
    return `/images/${imageName}`;
}
exports.getImageUrl = getImageUrl;
function getUsersImagesNames(userId) {
    return fs_1.default.readdirSync(getUserUploadsDirectory(userId));
}
exports.getUsersImagesNames = getUsersImagesNames;
function saveImage(userId, name, imageBuffer) {
    fs_1.default.writeFileSync(getImagePath(userId, name), imageBuffer);
}
exports.saveImage = saveImage;
function getUsersImagesData(userId) {
    return getUsersImagesNames(userId).map(imageName => ({
        imageName: imageName,
        url: getImageUrl(imageName),
        path: getImagePath(userId, imageName),
    }));
}
exports.getUsersImagesData = getUsersImagesData;
function deleteImage(userId, imageName) {
    fs_1.default.unlinkSync(getImagePath(userId, imageName));
}
exports.deleteImage = deleteImage;
function saveExcel(userId, name, data) {
    fs_1.default.writeFileSync(getImagePath(userId, name), data);
}
exports.saveExcel = saveExcel;
//# sourceMappingURL=services.js.map