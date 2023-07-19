import IGroupPermission from './IGroupPermission';

class Permissions
{
    // FILES
    static readonly FILES_UPLOAD: string = 'res:files#scopes:upload';
    static readonly FILES_UPDATE: string = 'res:files#scopes:update';
    static readonly FILES_DOWNLOAD: string = 'res:files#scopes:download';
    static readonly FILES_DELETE: string = 'res:files#scopes:delete';
    static readonly FILES_LIST: string = 'res:files#scopes:list';
    static readonly FILES_SHOW_METADATA: string = 'res:files#scopes:showMetadata';

    static groupPermissions(): IGroupPermission[]
    {
        return [
            {
                group: 'FILES',
                permissions: [
                    Permissions.FILES_UPLOAD,
                    Permissions.FILES_UPDATE,
                    Permissions.FILES_DELETE,
                    Permissions.FILES_DOWNLOAD,
                    Permissions.FILES_LIST,
                    Permissions.FILES_SHOW_METADATA
                ]
            }
        ];
    }

    static permissions(): string[]
    {
        return Permissions.groupPermissions().reduce((accum, group) => accum.concat(group.permissions), []);
    }
}

export default Permissions;
