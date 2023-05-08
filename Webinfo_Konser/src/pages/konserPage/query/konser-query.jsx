import { gql } from "@apollo/client";

export const GET_KONSER = gql`
  query Konser {
    konser {
      uuid
      namaKonser
      avatar
      deskripsi
      linkTiket
      tanggal
      lokasi
    }
  }
`;

export const ADD_KONSER = gql`
  mutation MyMutation($object: konser_insert_input = {}) {
    insert_konser_one(object: $object) {
      deskripsi
      linkTiket
      namaKonser
      avatar
      tanggal
      lokasi
      uuid
    }
  }
`;

export const DELETE_KONSER = gql`
  mutation deleteKonser($uuid: uuid!) {
    delete_konser_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;

export const UPDATE_KONSER = gql`
  mutation updateKonser($pk_columns: konser_pk_columns_input!, $_set: konser_set_input!) {
    update_konser_by_pk(pk_columns: $pk_columns, _set: $_set) {
      uuid
    }
  }
`;

export const UPDATE_USER = gql`
  mutation user($pk_columns: users_pk_columns_input!, $_set: users_set_input!) {
    update_users_by_pk(pk_columns: $pk_columns, _set: $_set) {
      uuid
    }
  }
`;
