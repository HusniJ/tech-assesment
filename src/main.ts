import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('GS-Tech Assesment')
    .setDescription('MERN Stack Tech Assessment')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger.json", JSON.stringify(document));
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
