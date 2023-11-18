import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getTypeOrmConfig = (configService: ConfigService) =>
  ({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: configService.get('DB_PORT') || 5432,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [],
    autoLoadEntities: true,
    bigNumberStrings: false,
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  }) as TypeOrmModuleOptions;
