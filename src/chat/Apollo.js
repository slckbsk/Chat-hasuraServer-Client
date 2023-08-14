import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const admin = process.env.REACT_APP_API_KEY;
console.log(admin);

const httpLink = new HttpLink({
  uri: "https://sefihuom-chat-server.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": admin,
  },
});

const wsLink = new WebSocketLink({
  uri: "ws://sefihuom-chat-server.hasura.app/v1/graphql",

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

const socket = new WebSocket("ws://sefihuom-chat-server.hasura.app/v1/graphql");

socket.addEventListener("open", (event) => {
  console.log("WebSocket connection opened:", event);
});

socket.addEventListener("message", (event) => {
  console.log("WebSocket message received:", event.data);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket connection closed:", event);
});

export default client;
