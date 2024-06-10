import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const apiKey = process.env.REACT_APP_RAPID_API_KEY;

const baseUrl = "https://coinranking1.p.rapidapi.com/";
console.log(process.env.REACT_APP_RAPID_API_KEY)
// const createRequest = (url) => ({ url, headers: headers});

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
      query: () => "/coins",
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
