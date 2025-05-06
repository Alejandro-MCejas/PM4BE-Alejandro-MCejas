import { registerAs } from "@nestjs/config";
import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config({
    path: '.env'
})

const isProduction = process.env.NODE_ENV === 'production'




export const dataSourceOptions: DataSourceOptions = isProduction
    ? {
        type: 'postgres',   
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),  
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/*{.ts,.js}'],
        synchronize: true,
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.SSL_CA?.split('\\n').join('\n')
        },
        logging: false,

    }
    
    
    
    // {
    //     type: 'postgres',
    //     url: process.env.DATABASE_URL,
    //     entities: ['dist/**/*.entity{.ts,.js}'],
    //     migrations: ['dist/migration/*{.ts,.js}'],
    //     synchronize: true,
    //     ssl: {
    //         ca: process.env.SSL_CA?.split('\\n').join('\n'),
    //         rejectUnauthorized: false
    //     },
    //     logging: false
    // }

    : {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/*{.ts,.js}'],
        synchronize: true,
        // dropSchema: true,
        logging: false,
    }

export const postgresDataSourceConfig = registerAs('postgres', () => dataSourceOptions)

export const PostgresDataSource = new DataSource(dataSourceOptions)
