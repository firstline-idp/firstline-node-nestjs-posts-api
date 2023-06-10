import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}

