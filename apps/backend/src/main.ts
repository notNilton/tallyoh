import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Suprime um DeprecationWarning específico do `pg` (client.query concorrente).
// É um warning de compatibilidade que não altera o funcionamento do backend,
// mas polui o log enquanto as dependências ainda não foram ajustadas.
process.on('warning', (warning) => {
  if (
    warning?.name === 'DeprecationWarning' &&
    typeof warning?.message === 'string' &&
    warning.message.includes(
      'Calling client.query() when the client is already executing a query is deprecated',
    )
  ) {
    return;
  }

  // Mantém o comportamento padrão para outros warnings.

  console.warn(warning);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false, // Temporarily disabled to diagnose 400 errors
    }),
  );
  app.enableCors({
    origin: process.env.WEBAPP_URL ?? 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
