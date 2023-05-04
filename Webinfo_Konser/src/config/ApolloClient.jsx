import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://organic-whale-65.hasura.app/v1/graphql",
    // url: "https://organic-whale-65.hasura.app/v1/graphql",
    cache: new InMemoryCache({addTypename: false}),
    headers: {
        "x-hasura-admin-secret":
        "AFvxLBHI67gWybwd2ai1KeQuQnigz9lbJzhIbBMrQPQ1ChAAmPtYRlDryzXlOsSx"
        
    },
});