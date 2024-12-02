import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { GlobalResponseInterceptor } from './common/interceptors/global-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // Apply global interceptors
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.enableCors()
  await app.listen(process.env.PORT ?? 3001);

}
bootstrap();
