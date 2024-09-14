import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Db } from 'src/db/db';
import { JwtService } from '@nestjs/jwt';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService , JwtService , 
        {
          provide:Db , 
          useValue:{
            someMethod:jest.fn()
          }
  
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
