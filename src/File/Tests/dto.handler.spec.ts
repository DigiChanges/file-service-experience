import { UploadFileBase64 } from './fixture';
import FileBase64OptimizeDTO from '../Presentation/DTO/FileBase64OptimizeDTO';
import FileBase64RepPayload from '../Domain/Payloads/FileBase64RepPayload';
import FileMultipartOptimizeDTO from '../Presentation/DTO/FileMultipartOptimizeDTO';
import IFileVersionPayload from '../Domain/Entities/IFileVersionPayload';
import { randomUUID } from 'crypto';
import FileOptionsQueryPayload from '../Domain/Payloads/FileOptionsQueryPayload';
import FileUpdateBase64OptimizeDTO from '../Presentation/DTO/FileUpdateBase64OptimizeDTO';
import FileVersionOptimizeDTO from '../Presentation/DTO/FileVersionOptimizeDTO';
import IFileVersionDomain from '../Domain/Entities/IFileVersionDomain';
import IFileDomain from '../Domain/Entities/IFileDomain';
import FileUpdateMultipartOptimizeDTO from '../Presentation/DTO/FileUpdateMultipartOptimizeDTO';

const mockFileBase64RepPayload: FileBase64RepPayload = {
    base64: UploadFileBase64.base64,
    extension: '',
    isImage: false,
    isPublic: false,
    mimeType: '',
    originalName: UploadFileBase64.filename,
    path: '/',
    query: {
        isOriginalName: true,
        isPublic: true,
        isOverwrite: true,
        isOptimize: true
    },
    size: 1024
};

const mockIFileVersionPayload: IFileVersionPayload = {
    _id: randomUUID(),
    base64: UploadFileBase64.base64,
    destination: '/',
    encoding: '',
    extension: '',
    filename: UploadFileBase64.filename,
    isImage: false,
    mimeType: '',
    originalName: '',
    path: '/',
    size: 1024
};

const mockFileOptionsQueryPayload: FileOptionsQueryPayload = {
    isOptimize: false,
    isOriginalName: false,
    isOverwrite: false,
    isPublic: false
};

const mockFileMultipartOptimizeDTO: FileMultipartOptimizeDTO = {
    file: mockIFileVersionPayload,
    query: mockFileOptionsQueryPayload
};

const mockIFileDomain = {
    createdAt: new Date(),
    currentVersion: 0,
    updatedAt: new Date()
} as IFileDomain;

const mockIFileVersionDomain =
    {
        createdAt: new Date(),
        extension: '',
        file: mockIFileDomain,
        isImage: false,
        isOptimized: false,
        isPublic: false,
        mimeType: '',
        name: '',
        objectPath: '',
        originalName: '',
        path: '',
        size: 1024,
        updatedAt: new Date(),
        version: 0
    } as IFileVersionDomain;

describe('Start File Test', () =>
{
    describe('File Success', () =>
    {
        test('should validate FileBase64OptimizeDTO', () =>
        {
            const fileBase64OptimizeDTO = new FileBase64OptimizeDTO(mockFileBase64RepPayload, UploadFileBase64.base64);

            expect(fileBase64OptimizeDTO.isOptimize).toStrictEqual(true);
            expect(fileBase64OptimizeDTO.isOriginalName).toStrictEqual(true);
            expect(fileBase64OptimizeDTO.isOverwrite).toStrictEqual(true);
            expect(fileBase64OptimizeDTO.isPublic).toStrictEqual(false);
            expect(fileBase64OptimizeDTO.originalName).toStrictEqual('webpphoto.png');
            expect(fileBase64OptimizeDTO.base64).toStrictEqual(UploadFileBase64.base64);
            expect(fileBase64OptimizeDTO.mimeType).toStrictEqual('image/webp');
            expect(fileBase64OptimizeDTO.path).toStrictEqual('/');
            expect(fileBase64OptimizeDTO.size).toStrictEqual(1024);
            expect(fileBase64OptimizeDTO.isImage).toStrictEqual(false);
        });

        test('should validate FileMultipartOptimizeDTO', () =>
        {
            const fileMultipartOptimizeDTO = new FileMultipartOptimizeDTO(mockFileMultipartOptimizeDTO.file, mockFileMultipartOptimizeDTO.query);

            expect(fileMultipartOptimizeDTO.file).toStrictEqual(mockFileMultipartOptimizeDTO.file);
            expect(fileMultipartOptimizeDTO.query).toStrictEqual(mockFileMultipartOptimizeDTO.query);
        });

        test('should validate FileUpdateBase64OptimizeDTO', () =>
        {
            const id = randomUUID();
            const fileUpdateBase64OptimizeDTO = new FileUpdateBase64OptimizeDTO({ ...mockFileBase64RepPayload, id }, UploadFileBase64.base64);

            expect(fileUpdateBase64OptimizeDTO.id).toStrictEqual(id);
        });

        test('should validate FileUpdateMultipartOptimizeDTO', () =>
        {
            const fileUpdateMultipartOptimizeDTO = new FileUpdateMultipartOptimizeDTO(mockIFileVersionPayload, mockFileOptionsQueryPayload);

            expect(fileUpdateMultipartOptimizeDTO.id).toStrictEqual(mockIFileVersionPayload._id);
        });

        test('should validate FileVersionOptimizeDTO', () =>
        {
            const fileVersionOptimizeDTO = new FileVersionOptimizeDTO(mockIFileVersionPayload, mockIFileVersionDomain);

            expect(fileVersionOptimizeDTO.extension).toStrictEqual('webp');
            expect(fileVersionOptimizeDTO.file).toStrictEqual(mockIFileVersionPayload);
            expect(fileVersionOptimizeDTO.isImage).toStrictEqual(true);
            expect(fileVersionOptimizeDTO.isPublic).toStrictEqual(false);
            expect(fileVersionOptimizeDTO.originalName).toStrictEqual('');
            expect(fileVersionOptimizeDTO.mimeType).toStrictEqual('');
            expect(fileVersionOptimizeDTO.path).toStrictEqual('/');
            expect(fileVersionOptimizeDTO.size).toStrictEqual(1024);
            expect(fileVersionOptimizeDTO.isImage).toStrictEqual(true);
        });
    });
});

