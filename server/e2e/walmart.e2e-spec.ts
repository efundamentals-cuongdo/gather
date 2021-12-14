import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { WalmartDTO } from '../src/service/dto/walmart.dto';
import { WalmartService } from '../src/service/walmart.service';

describe('Walmart Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId'
    }

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock
    };


    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).overrideGuard(AuthGuard)
        .useValue(authGuardMock)
        .overrideGuard(RolesGuard)
        .useValue(rolesGuardMock)
        .overrideProvider(WalmartService)
        .useValue(serviceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all walmarts ', async () => {

        const getEntities: WalmartDTO[] = (await request(app.getHttpServer())
        .get('/api/walmarts')
        .expect(200)).body;

        expect(getEntities).toEqual(entityMock);

    }
    );

    it('/GET walmarts by id', async () => {


        const getEntity: WalmartDTO = (await request(app.getHttpServer())
            .get('/api/walmarts/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);

    }
    );

    it('/POST create walmarts', async () => {

        const createdEntity: WalmartDTO = (await request(app.getHttpServer())
            .post('/api/walmarts')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);

    }
    );

    it('/PUT update walmarts', async () => {


        const updatedEntity: WalmartDTO = (await request(app.getHttpServer())
            .put('/api/walmarts')
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );

    it('/PUT update walmarts from id', async () => {


        const updatedEntity: WalmartDTO = (await request(app.getHttpServer())
            .put('/api/walmarts/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;


        expect(updatedEntity).toEqual(entityMock);

    }
    );


    it('/DELETE walmarts', async () => {


        const deletedEntity: WalmartDTO = (await request(app.getHttpServer())
            .delete('/api/walmarts/' + entityMock.id)
            .expect(204)).body;

            expect(deletedEntity).toEqual({});
    }
    );

    afterEach(async () => {
        await app.close();
    });
});

