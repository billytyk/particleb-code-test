import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/bech32 (GET)', () => {
    const body = {
      seed: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
      derivePath: "m/84'/0'/0'/0/0",
    };

    return request(app.getHttpServer())
      .post('/bech32')
      .send(body)
      .expect(200)
      .expect('bc1qus4pey02mv9mn47pxmkj46wregdxmuy0h70qyn');
  });

  it('/p2sh-ms (GET)', () => {
    const body = {
      pubKeys: [
        '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
      ],
      m: 2,
    };

    return request(app.getHttpServer())
      .post('/p2sh-ms')
      .send(body)
      .expect(200)
      .expect('36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7');
  });

  it('/p2sh-ms (GET) no m return 400', () => {
    const body = {
      pubKeys: [
        '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
      ],
    };

    return request(app.getHttpServer())
      .post('/p2sh-ms')
      .send(body)
      .expect(400)
      .expect('');
  });
});
