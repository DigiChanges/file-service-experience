import Router from 'koa-router';
import FileController from '../Controllers/FileKoaController';
import FileKoaReqMulterMiddleware from '../Middlewares/FileKoaReqMulterMiddleware';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/files'
};

const FileKoaRouter: Router = new Router(routerOpts);

FileKoaRouter.get('/', FileController.listFiles);
FileKoaRouter.get('/objects', FileController.listObjects);
FileKoaRouter.get('/metadata/:id', FileController.getFileMetadata);
FileKoaRouter.post('/base64', FileController.uploadBase64);
FileKoaRouter.post('/', <any>FileKoaReqMulterMiddleware.single('file'), FileController.uploadMultipart);
FileKoaRouter.post('/presigned-get-object', FileController.getPresignedGetObject);
FileKoaRouter.get('/:id', FileController.download);
FileKoaRouter.put('/optimize/:id', FileController.optimize);
FileKoaRouter.put('/base64/:id', FileController.updateBase64);
FileKoaRouter.put('/:id', <any>FileKoaReqMulterMiddleware.single('file'), FileController.updateMultipart);
FileKoaRouter.delete('/:id', FileController.remove);

export default FileKoaRouter;
