import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import FileSystemFactory from '../../Shared/Factories/FileSystemFactory';
import { middlewareMulterMock, UploadFileBase64, UploadFileMultipart } from './fixture';
import { IFileResponse } from './types';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';
import FileKoaReqMulterMiddleware from '../Presentation/Middlewares/FileKoaReqMulterMiddleware';

const FileSystemMocked =
    {
        listObjects: jest.fn(),
        uploadFile: jest.fn(),
        uploadFileByBuffer: jest.fn(),
        downloadFile: jest.fn(),
        downloadStreamFile: jest.fn(),
        presignedGetObject: jest.fn(),
        presignedPutObject: jest.fn(),
        createBucket: jest.fn(),
        removeObjects: jest.fn(),
        setBucketPolicy: jest.fn()
    };


describe('Start File Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let file_id = '';

    beforeAll(async() =>
    {
        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;

        jest.spyOn(FileSystemFactory, 'create').mockImplementation(() => FileSystemMocked);
        jest.spyOn(FileKoaReqMulterMiddleware, 'single').mockReturnValue(() => middlewareMulterMock as unknown as any);
        jest.mock('../Domain/Services/FileService');
    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();
    }));

    describe('File Success', () =>
    {
        // FIXME: can't make it pass from the middleware
        test.skip('Upload File /files', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files/')
                .set('Accept', 'application/json')
                .send(UploadFileMultipart);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.id).toBeDefined();
            expect(data.currentVersion).toStrictEqual(1);
            expect(data.versions.length).toStrictEqual(1);
        });

        test('Upload File /files/base64', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files/base64')
                .set('Accept', 'application/json')
                .send(UploadFileBase64);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.id).toBeDefined();
            expect(data.currentVersion).toStrictEqual(1);
            expect(data.versions.length).toStrictEqual(1);

            file_id = data.id;
        });

        test('Get File /files/metadata/:id', async() =>
        {
            const response = await request
                .get(`/api/files/metadata/${file_id}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data.id).toStrictEqual(file_id);
        });

        test('Update File /file/base64/:id', async() =>
        {
            const response: IFileResponse = await request
                .put(`/api/files/base64/${file_id}`)
                .set('Accept', 'application/json')
                .send(UploadFileBase64);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.currentVersion).toStrictEqual(2);
            expect(data.versions.length).toStrictEqual(2);
        });

        test('Get presigned File /file/presigned-get-object', async() =>
        {
            FileSystemMocked.presignedGetObject.mockReturnValueOnce(
                {
                    presignedGetObject: ''
                });
            const response = await request
                .post('/api/files/presigned-get-object')
                .set('Accept', 'application/json')
                .send({
                    file: `${file_id}`,
                    version: 1,
                    expiry: 241921
                });


            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data.presignedGetObject).toBeDefined();
        });

        test('Get Files /files', async() =>
        {
            const response = await request
                .get('/api/files?pagination[limit]=30&pagination[offset]=0')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Objects /files/objects', async() =>
        {
            FileSystemMocked.listObjects.mockReturnValueOnce(
                {
                    data: []
                });
            const response = await request
                .get('/api/files/objects')
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data).toBeDefined();
        });

        test('Update Optimize File /api/files/optimize/:id', async() =>
        {
            const response = await request
                .put(`/api/files/optimize/${file_id}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data).toBeDefined();
            expect(data.id).toBeDefined();
            expect(data.versions).toBeDefined();
        });

        test('Delete file /files/:id', async() =>
        {
            const response = await request
                .delete(`/api/files/${file_id}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.id).toBeDefined();
            expect(data.currentVersion).toBeDefined();
            expect(data.versions).toBeDefined();
        });
    });

    describe('File Failed', () =>
    {
        test('Upload File /files/base64', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files/base64')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(500);
        });

        test('Get File /files/metadata/:id', async() =>
        {
            const response = await request
                .get('/api/files/metadata/123456')
                .set('Accept', 'application/json')
                .send();

            const { body } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(body.message).toStrictEqual('Request Failed.');
            expect(body.errors[0].message).toStrictEqual('Invalid uuid');
        });

        test('Update File /file/base64/:id', async() =>
        {
            const response = await request
                .put('/api/files/base64/123456')
                .set('Accept', 'application/json')
                .send(UploadFileBase64);

            const { body } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(body.message).toStrictEqual('Request Failed.');
            expect(body.errors[0].message).toStrictEqual('Invalid uuid');
        });

        test('Get presigned File /file/presigned-get-object', async() =>
        {
            const response = await request
                .post('/api/files/presigned-get-object')
                .set('Accept', 'application/json')
                .send({
                    file: '123456acd',
                    version: null,
                    expiry: 1
                });


            const { body } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(body.message).toStrictEqual('Request Failed.');
            expect(body.errors[0].message).toStrictEqual('Invalid uuid');
            expect(body.errors[1].message).toStrictEqual('Number must be greater than or equal to 241920');
            expect(body.errors[2].message).toStrictEqual('Expected number, received null');
        });
    });
});

