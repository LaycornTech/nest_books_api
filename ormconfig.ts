import { omit, unset } from 'lodash';
// import { pathFromSrc } from './src/config/helpers/general';
import { DataSourceOptions } from 'typeorm';
import processDatabaseConfig from './src/config/env/database.config';
import { cwd } from 'process';


type TypeOrmDataSourceOptions = DataSourceOptions & {
  seeds: string[];
  factories: string[];
};

const databaseConfig = processDatabaseConfig();
if (databaseConfig.url) {
  unset(databaseConfig, 'host');
  unset(databaseConfig, 'port');
  unset(databaseConfig, 'username');
  unset(databaseConfig, 'password');
  unset(databaseConfig, 'database');
} else {
  unset(databaseConfig, 'url');
}

const defaultDataSourceOptions: TypeOrmDataSourceOptions = {
  applicationName: 'lawma_app',
  name: 'default',
  type: 'postgres',
  ...omit(databaseConfig, ['maxPoolConnCount']),
  synchronize: false,
  logging: 'all',
  logger: 'file',
  entities: ['./src/**/*.entity.{js,ts}'],
  migrations: [cwd() + '/src/config/database/migrations/*.{js,ts}'],
  seeds: [cwd() + ('src/config/database/seeds/**/*.{js,ts}')],
  factories: [cwd() + ('src/config/database/factories/**/*.{js,ts}')],
  subscribers: [cwd() + ('src/config/database/subscribers/**/*.{js,ts}')],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  useUTC: true,
  connectTimeoutMS: 10000,
  dropSchema: false,
  migrationsTransactionMode: 'all',
  metadataTableName: 'typeorm_metadata',
  maxQueryExecutionTime: 15000, //Ideal should be 10000 (10s)
  installExtensions: true,
  logNotifications: true,
  ssl: true,
  extra: {
    max: databaseConfig.maxPoolConnCount,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cache: {
    type: 'database',
    tableName: 'typeorm_cache_table',
  },
};

export default defaultDataSourceOptions;
