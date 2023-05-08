import { gql } from "@apollo/client";

export const GET_KONSER = gql`
  query Konser {
    konser(order_by: { timeStamp: asc }) {
      uuid
      namaKonser
      avatar
      deskripsi
      linkTiket
      tanggal
      lokasi
      timeStamp
    }
  }
`;

export const GET_KONSER_BY_PK = gql`
  query Konser($uuid: uuid!) {
    konser_by_pk(uuid: $uuid) {
      avatar
      deskripsi
      linkTiket
      lokasi
      namaKonser
      tanggal
      timeStamp
      uuid
    }
  }
`;

export const GET_ARTIS = gql`
  query Artis {
    artis (order_by: {namaArtis: asc}) {
      avatar
      namaArtis
      timeStamp
      uuid
    }
  }
`;
