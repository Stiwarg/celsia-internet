export interface IDbConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    dbPort: number;
};
  

export interface IConfig {
    nodeEnv: string;
    host: string;
    port: number;
    backendUrl: string;
    frontendUrl: string;
    db: IDbConfig;
};
