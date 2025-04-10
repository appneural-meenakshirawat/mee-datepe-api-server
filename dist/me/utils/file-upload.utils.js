"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameFilesInterceptor = exports.editFileName = exports.imageFileFilter = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
let RenameFilesInterceptor = class RenameFilesInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        request.files.map((file) => {
            const originalname = file.originalname;
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const newFilename = `${uniqueName}${(0, path_1.extname)(originalname)}`;
            file.filename = newFilename;
            return file;
        });
        return next.handle();
    }
};
RenameFilesInterceptor = __decorate([
    (0, common_1.Injectable)()
], RenameFilesInterceptor);
exports.RenameFilesInterceptor = RenameFilesInterceptor;
//# sourceMappingURL=file-upload.utils.js.map