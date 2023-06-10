import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: false,
      transform: true,
      transformOptions: {
        exposeUnsetFields: false,
      },
    }),
  );

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

