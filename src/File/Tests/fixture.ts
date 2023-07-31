export const UploadFileBase64 = {
    filename: 'photo.png',
    base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII='
};

export const UploadFileMultipart = {
    file: {
        fieldname: 'file',
        originalname: 'images.jpeg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/tmp',
        filename: 'images.jpeg',
        path: '/tmp/images.jpeg',
        size: 180036
    },
    query: {
        isOptimize: 'true',
        isOriginalName: 'true',
        isPublic: 'false'
    }
};

interface ctxMulterMock
{
    method: string;
    url: string;
    header: Record<string, unknown>;
    request: typeof UploadFileMultipart;
}

export const middlewareMulterMock: ctxMulterMock = {
    method: 'POST',
    url: '/api/files/',
    header: {
        'host': '127.0.0.1:35921',
        'accept-encoding': 'gzip, deflate',
        'accept': 'application/json',
        'content-type': 'application/json',
        'content-length': '259',
        'connection': 'close'
    },
    request: UploadFileMultipart
};
