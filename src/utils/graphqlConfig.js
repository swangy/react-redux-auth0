import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_ENDPOINT } from './config';
import {useAuth0} from "./react-auth0-spa";

const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

// See https://www.apollographql.com/docs/react/basics/network-layer.html
const authMiddleware = new ApolloLink((operation, forward) => {
    const { getTokenSilently } = useAuth0();
    operation.setContext({
        headers: {
            authorization: 'Bearer ' + getTokenSilently() || null,
        }
    });

    return forward(operation);
});

const errAfterware = onError(({ networkError, ...rest }) => {
    // Stupid doc (see https://www.apollographql.com/docs/link/links/http.html) doesn't match
    // the actual support in the provide module :(
    // * https://github.com/apollographql/apollo-link/issues/218
    // * https://github.com/apollographql/apollo-link/issues/300
    console.log("errAfterware: %o", { networkError, ...rest, ...rest.operation.variables });
    if(networkError) {
        if ((networkError.statusCode ||
            networkError.status) === 401 ||
            networkError.message.toLowerCase() === 'failed to fetch') { // temp workaround
        }
    }
});

export const apolloClient = new ApolloClient({
    link: concat(authMiddleware, errAfterware.concat(httpLink)),
    cache: new InMemoryCache(),
});