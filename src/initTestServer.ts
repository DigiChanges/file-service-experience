import { IApp } from '@digichanges/shared-experience';

import container from './register';

import supertest from 'supertest';

import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';
import { EventHandler } from '@digichanges/shared-experience';
import { validateEnv } from './Config/validateEnv';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Utils/Locales';
import MainConfig from './Config/MainConfig';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import { REPOSITORIES } from './Config/Injects';
import { Lifecycle } from 'tsyringe';

type TestServerData = {
    request: supertest.SuperAgentTest,
    dbConnection: ICreateConnection
}

const initTestServer = async(): Promise<TestServerData> =>
{
    validateEnv();

    const config = MainConfig.getInstance().getConfig();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    await dbConnection.initConfigTest();
    await dbConnection.create();
    await dbConnection.synchronize();

    const eventHandler = EventHandler.getInstance();

    void Locales.getInstance();

    const appBootstrap = AppBootstrapFactory.create(config.app.default);

    const app: IApp = await appBootstrap({
        serverPort: 8088,
        proxy: false
    });

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    return { request, dbConnection };
};

export default initTestServer;
