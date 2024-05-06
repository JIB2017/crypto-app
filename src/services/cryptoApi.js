import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const headers = {
  "x-rapid-host": "coinranking1.p.rapidapi.com",
  "x-rapid-key": "c63ab3c9demsh15b00b8b10e5e69p1d6a5ajsn032bdcc9707a",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/stats";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl, headers }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => "/exchanges",
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
