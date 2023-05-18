import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${process.env.REACT_APP_OJT_ATTENDANCE_HASURA_HTTP_URL}`,
  headers: {
    "x-hasura-admin-secret": `${process.env.REACT_APP_OJT_ATTENDANCE_PASSWORD}`,
  },
  cache: new InMemoryCache(),
});
