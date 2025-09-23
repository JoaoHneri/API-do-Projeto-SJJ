import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser middleware
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration with credentials support
  app.enableCors({
    origin: true, // Configure com seus domínios específicos em produção
    credentials: true, // Importante para permitir cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
