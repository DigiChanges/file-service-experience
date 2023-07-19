import { StatusCode, DecryptForbiddenException, NotFoundException } from '@digichanges/shared-experience';
import InvalidPasswordException from './Main/Domain/Exceptions/InvalidPasswordException';
import UniqueAttributeException from './Main/Domain/Exceptions/UniqueAttributeException';

const exceptions = {
    [DecryptForbiddenException.name]: StatusCode.HTTP_FORBIDDEN,
    [NotFoundException.name]: StatusCode.HTTP_BAD_REQUEST,
    [InvalidPasswordException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY,
    [UniqueAttributeException.name]: StatusCode.HTTP_BAD_REQUEST
};

export default exceptions;
