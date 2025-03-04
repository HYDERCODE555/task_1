import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUp } from './entities/signup.entities';

@Module({
  imports: [TypeOrmModule.forFeature([SignUp]),],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
