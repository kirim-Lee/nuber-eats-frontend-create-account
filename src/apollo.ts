import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LS_TOKEN } from './constants';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const token = localStorage.getItem(LS_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: 'https://nuber-eats-assignment.herokuapp.com/graphql',
  // uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-JWT': authTokenVar(),
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'ws://nuber-eats-assignment.herokuapp.com/graphql',
  // uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      'X-JWT': authTokenVar(),
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
