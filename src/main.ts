import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/loggerGlobal.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeed } from './seeds/users/users.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerGlobal);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest API Ecommerce')
    .setDescription('API NestJS para Ecommerce de productos y categorias en el que los usuarios pueden ver productos sin iniciar sesión o pueden registrarse, iniciar sesión y comprar productos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('API', app, document);

  const categoriesSeed = app.get(CategoriesSeed)
  await categoriesSeed.seedCategories()
  console.log('Categories seeded');

  const productsSeed = app.get(ProductsSeed)
  await productsSeed.seedProducts()
  console.log('Products seeded');

  const usersSeed = app.get(UsersSeed)
  await usersSeed.seedUsers()
  console.log('Users seeded');
  

  await app.listen(3000);
}
bootstrap();
