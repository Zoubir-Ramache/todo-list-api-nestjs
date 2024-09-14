import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { JwtService } from '@nestjs/jwt';
import { Todos } from './todos';
import { Db } from 'src/db/db';
describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers:[Todos , {
        provide:Db , 
        useValue:{
          someMethod:jest.fn()
        }

      }]
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
