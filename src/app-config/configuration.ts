const ENV_APP_PORT = "APP_PORT";
const ENV_NODE_ENV = "NODE_ENV";

const DEFAULT_PORT = "8080";
const DEFAULT_ENV = "production";

export const CONFIG_PORT = "port";
export const CONFIG_ENV = "environment";

export default function configBuilder(): Record<string, string> {
    return {
        [CONFIG_PORT]: process.env[ENV_APP_PORT] || DEFAULT_PORT,
        [CONFIG_ENV]: process.env[ENV_NODE_ENV] || DEFAULT_ENV
    };
}