import { gql } from "@apollo/client";

export const GET_KONSER_AGGREGATE = gql`
  query Konser {
    konser_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ARTIS_AGGREGATE = gql`
  query Artis {
    artis_aggregate {
      aggregate {
        count
      }
    }
  }
`;
