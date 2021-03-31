import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getModelToken } from '@nestjs/mongoose';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,
        {
          provide: getModelToken('userModal'),
          useValue: MongooseMockModal
        },
        {
          provide: getModelToken('userImageModal'),
          useValue: MongooseMockModal
        }
      ]
    }).compile();

    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('all users', () => {
    it('should return an array of users', async () => {
      const result = Promise.resolve([{
        _id: "605c9b2f0d9a6000157b71b3",
        userId: "1",
        name: "Test User One",
        __v: 0
      },
      {
        _id: "605c9b540d9a6000157b71b4",
        userId: "2",
        name: "Test User Two",
        __v: 0
      }
      ]);
      jest.spyOn(appService, 'getAll').mockImplementation(() => result);
      expect(await appController.All()).toBe(result);
    });
  });
});


class MongooseMockModal {
  constructor(private data) { }
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([]);
}