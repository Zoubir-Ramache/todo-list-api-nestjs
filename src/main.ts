import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder , SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder()
  .setTitle("todo list api docs")
  .setDescription("docs ")
  .setVersion('1.0')
  .build()
  app.setGlobalPrefix('api')
  const document = SwaggerModule.createDocument(app , config)
  SwaggerModule.setup('api/docs', app , document)
  await app.listen(3000);
}
bootstrap();
