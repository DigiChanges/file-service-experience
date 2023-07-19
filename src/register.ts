import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy, BcryptEncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, REPOSITORIES } from './Config/Injects';

import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';
import IFileVersionRepository from './File/Infrastructure/Repositories/IFileVersionRepository';
import FileVersionMongooseRepository from './File/Infrastructure/Repositories/FileVersionMongooseRepository';
import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';

// Repositories
container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });

// Shared
container.register<IEncryption>(FACTORIES.BcryptEncryptionStrategy, { useClass: BcryptEncryptionStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
