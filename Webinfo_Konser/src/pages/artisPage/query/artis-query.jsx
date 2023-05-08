import { gql } from "@apollo/client";

export const GET_ARTIS = gql`
  query Artis {
    artis {
      avatar
      namaArtis
      uuid
    }
  }
`;

export const ADD_ARTIS = gql`
  mutation addArtis($object: artis_insert_input = {}) {
    insert_artis_one(object: $object) {
      uuid
      namaArtis
      avatar
    }
  }
`;

export const UPDATE_ARTIS = gql`
  mutation updateArtis(
    $pk_columns: artis_pk_columns_input!
    $_set: artis_set_input!
  ) {
    update_artis_by_pk(pk_columns: $pk_columns, _set: $_set) {
      uuid
    }
  }
`;

export const DELETE_ARTIS = gql`
  mutation deleteArtis($uuid: uuid!) {
    delete_artis_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;
