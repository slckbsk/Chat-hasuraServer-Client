import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { DELETE_USERS } from "./queries";

const admin = process.env.REACT_APP_API_KEY;

const httpLink = new HttpLink({
  uri: "https://sefihuom-chat-server.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": admin,
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://sefihuom-chat-server.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": admin,
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


export default client;
