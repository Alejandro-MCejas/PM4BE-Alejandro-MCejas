import { registerAs } from "@nestjs/config";
import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config({
    path: '.env'
})


export const dataSourceOptions: DataSourceOptions = {
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
    // ssl: {
    //     rejectUnauthorized: false
    // }
}

export const postgresDataSourceConfig = registerAs('postgres', () => dataSourceOptions)

export const PostgresDataSource = new DataSource(dataSourceOptions)
