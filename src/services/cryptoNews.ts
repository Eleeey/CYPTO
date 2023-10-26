import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'


const cryptoNewsHeaders={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '81004dd29bmsh64031ee9d85c211p1e182bjsn4019035dbec9',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

  const baseUrl='https://bing-news-search1.p.rapidapi.com'

  const createRequest= (url: string)=>({ url, headers: cryptoNewsHeaders});


export const cryptoNewsApi = createApi({
  reducerPath:'cryptoNewsApi',
  baseQuery:fetchBaseQuery({ baseUrl }),
  endpoints:(builder)=>({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) =>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
})

export const {useGetCryptosNewsQuery} = cryptoNewsApi;
