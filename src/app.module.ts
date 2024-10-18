import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { globalConfig } from './config/globalconfig.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SeedModule } from './seeds/seeds.module';
import { OrderDetailModule } from './Order-detail/order-detail.module';
import { OrdersModule } from './Orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SharedModule } from './shared-module/shared-module.module';
import { CategoriesModule } from './categories/categories.module';



@Module({
  imports: [globalConfig,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('postgres')
    }), UsersModule, ProductsModule, AuthModule, SeedModule, OrderDetailModule, OrdersModule, FileUploadModule, SharedModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
