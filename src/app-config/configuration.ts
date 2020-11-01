export const ENV_APP_PORT = 'APP_PORT';
export const ENV_NODE_ENV = 'NODE_ENV';

export const DEFAULT_PORT = '8080';
export const DEFAULT_ENV = 'production';

export default function configBuilder(): Record<string, string> {
    return {
        [ENV_APP_PORT]: process.env[ENV_APP_PORT] || DEFAULT_PORT,
        [ENV_NODE_ENV]: process.env[ENV_NODE_ENV] || DEFAULT_ENV
    };
}
