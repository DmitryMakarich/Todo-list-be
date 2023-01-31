export const getEnv = (): string => process.env.NODE_ENV || 'development';

export const getServerPort = (): number | string => process.env.SERVER_PORT || 5000;
