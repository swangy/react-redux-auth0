const DEV_CONFIG = {
    GRAPHQL_ENDPOINT: 'http://XXXXXX:8888',
    AUTH_CONFIG: {
        domain: 'XXX.auth0.com',
        clientId: 'XXXXX',
        audience: 'xxxxxxxx',
        callbackUrl: 'http://XXXXXX:8080/callback',
        renewTokenBeforeExpiryMins: 100,
    },
};

const STAGING_CONFIG = {
    GRAPHQL_ENDPOINT: 'https://XXXXX.com',
    AUTH_CONFIG: {
        domain: 'XXX.auth0.com',
        clientId: 'XXXXX',
        audience: 'xxxxxxxx',
        callbackUrl: 'https://XXXX.com/callback',
        renewTokenBeforeExpiryMins: 100,
    },
};

const PRODUCTION_CONFIG = {
    GRAPHQL_ENDPOINT: 'https://XXXXXX.com',
    AUTH_CONFIG: {
        domain: 'XXX.auth0.com',
        clientId: 'XXXXX',
        audience: 'xxxxxxxx',
        callbackUrl: 'https://XXXXX.com/callback',
        renewTokenBeforeExpiryMins: 100,
    },
};

const env = process.env.NODE_ENV;

let GRAPHQL_ENDPOINT;
let AUTH_CONFIG;

switch (env) {
    case 'dev':
        GRAPHQL_ENDPOINT = DEV_CONFIG.GRAPHQL_ENDPOINT;
        AUTH_CONFIG = DEV_CONFIG.AUTH_CONFIG;
        break;
    case 'staging':
        GRAPHQL_ENDPOINT = STAGING_CONFIG.GRAPHQL_ENDPOINT;
        AUTH_CONFIG = STAGING_CONFIG.AUTH_CONFIG;
        break;
    case 'production':
        GRAPHQL_ENDPOINT = PRODUCTION_CONFIG.GRAPHQL_ENDPOINT;
        AUTH_CONFIG = PRODUCTION_CONFIG.AUTH_CONFIG;
        break;
    default:
        GRAPHQL_ENDPOINT = DEV_CONFIG.GRAPHQL_ENDPOINT;
        AUTH_CONFIG = DEV_CONFIG.AUTH_CONFIG;
}

export { GRAPHQL_ENDPOINT, AUTH_CONFIG };
