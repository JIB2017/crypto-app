import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com/";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      headers.set("X-RapidAPI-Key", process.env.REACT_APP_RAPID_API_KEY);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptosDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),
    getCryptoHistory: builder.query({
      query: ({coinId, timePeriod}) => `/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`
    })
  }),
});

export const { useGetCryptosQuery, useGetCryptosDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
