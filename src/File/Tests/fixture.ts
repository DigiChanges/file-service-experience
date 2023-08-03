import * as fs from 'fs';
import FormData from 'form-data';

export const UploadFileBase64 = {
    filename: 'photo.png',
    base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII='
};

// export const UploadFileMultipart = {
//     file: {
//         fieldname: 'file',
//         originalname: 'images.jpeg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: '/tmp',
//         filename: 'images.jpeg',
//         path: '/tmp/images.jpeg',
//         size: 180036
//     },
//     query: {
//         isOptimize: 'true',
//         isOriginalName: 'true',
//         isPublic: 'false'
//     }
// };

// interface ctxMulterMock
// {
//     method: string;
//     url: string;
//     header: Record<string, unknown>;
//     request: typeof UploadFileMultipart;
// }

// export const middlewareMulterMock: ctxMulterMock = {
//     method: 'POST',
//     url: '/api/files/',
//     header: {
//         'host': '127.0.0.1:35921',
//         'accept-encoding': 'gzip, deflate',
//         'accept': 'application/json',
//         'content-type': 'application/json',
//         'content-length': '259',
//         'connection': 'close'
//     },
//     request: UploadFileMultipart
// };


export const UploadFileMultipart = new FormData();
UploadFileMultipart.append('file', fs.createReadStream('./images.jpeg') as any);

// const configUploadMultipartMock = {
//     method: 'post',
//     url: 'http://localhost:8089/api/files?isOptimize=true&isOriginalName=true&isPublic=false',
//     headers: {
//         ...data.getHeaders()
//     },
//     data
// };
export const mockUploadMultipart = {
    method: 'POST',
    url: '/api/files',
    header: {
        'host': '127.0.0.1:34699',
        'accept-encoding': 'gzip, deflate',
        'accept': 'application/json',
        'content-type': 'application/json',
        'content-length': '2588',
        'connection': 'close'
    },
    data: UploadFileMultipart
};
