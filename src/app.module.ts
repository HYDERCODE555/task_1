import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUp } from './user/entities/signup.entities';
import { AuthMiddleware } from './shared/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// console.log('Database password:', process.env.DATABASE_PASSWORD);
// console.log('Database user:', process.env.DATABASE_USER);
// console.log('Database host:', process.env.DATABASE_HOST);

@Module({
 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: "localhost",
        port:  5432,
        password: "Oneclick1@",
        username: "postgres",
        entities: [SignUp],
        database: 'nest-auth',
        synchronize: true,
      }),
      ThrottlerModule.forRoot([{
        ttl: 10 * 1000,
        limit: 5,
      }]),
  
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService ,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
     .forRoutes('user/login');
  }
}
