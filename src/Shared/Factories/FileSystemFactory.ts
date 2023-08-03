import MainConfig from '../../Config/MainConfig';
import { IFilesystem, MinioStrategy } from '@digichanges/shared-experience';

type FileSystemValueProp = typeof MinioStrategy;

class FileSystemFactory
{
    static create(_default?: 'minio'): IFilesystem
    {
        const config = MainConfig.getInstance().getConfig().filesystem;
        const filesystemKey = _default ?? config.default;
        const filesystemConfig =  config[filesystemKey];

        const strategy = new Map<string, FileSystemValueProp>();
        strategy.set('minio', MinioStrategy);

        return new (strategy.get(filesystemKey))(filesystemConfig);
    }
}

export default FileSystemFactory;
