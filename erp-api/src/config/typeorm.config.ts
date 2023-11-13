import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const getTypeOrmConfig = (configService: ConfigService) =>
  ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [],
    autoLoadEntities: true,
    bigNumberStrings: false,
    synchronize: true,
    logging: true,
  }) as TypeOrmModuleOptions;
