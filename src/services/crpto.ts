import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

// Api Headers

const cApiHeaders= {
  'X-RapidAPI-Key': '81004dd29bmsh64031ee9d85c211p1e182bjsn4019035dbec9',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}



// api Url
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest= (url: string)=>({ url, headers: cApiHeaders});


export const cryptoApi = createApi({
  reducerPath:'cryptoApi',
  baseQuery:fetchBaseQuery({ baseUrl }),
  endpoints:(builder)=>({
    getCryptos: builder.query({
      query: (count) =>createRequest(`/coins?limit=${count}`)
    }),
    getCryptosDetails: builder.query({
      query: (coinid) =>createRequest(`/coin/${coinid}`)
    }),
    getCryptosHistory: builder.query({
      query: ({coinid, timePeriod}) =>createRequest(`/coin/${coinid}/history?timePeriod=${timePeriod}`)
    }),
  })
})

export const {useGetCryptosQuery, useGetCryptosDetailsQuery, useGetCryptosHistoryQuery} = cryptoApi;

headers: {
  
}