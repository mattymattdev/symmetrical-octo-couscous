import { neon, neonConfig } from '@neondatabase/serverless';

// See https://neon.tech/docs/serverless/serverless-driver
// for more information

const LOCAL_DATABASE_URL = "postgres://postgres:postgres@db.localtest.me:5432/cleanproject";

/**
 * Get a neon client for the given connection URL
 * 
 * TODO not sure we really should be doing conditional logic on every database request
 * 
 * @param connectionUrl The connection URL to use
 * @returns A neon client
 */
export const getSql = (connectionUrl: string) => {
    if (!connectionUrl) {
        throw new Error('No connection URL provided');
    }

    const url = new URL(connectionUrl);
    const host = url.host;
    const hostWithoutPort = host.split(':')[0];

    // The regular connection string style will not work with the serverless driver for local development...
    if (hostWithoutPort === 'db.localtest.me') {
        neonConfig.fetchEndpoint = (host) => {
            const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
            return `${protocol}://${host}:${port}/sql`;
        };
    }

    return neon(connectionUrl);
}