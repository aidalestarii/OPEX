import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
