import { Test, TestingModule } from '@nestjs/testing';
import { Todos } from './todos';
import { Db } from 'src/db/db';
describe('Todos', () => {
  let provider: Todos;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Todos , {
        provide:Db , 
        useValue:{
          someMethod:jest.fn()
        }
      }],
    }).compile();

    provider = module.get<Todos>(Todos);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
