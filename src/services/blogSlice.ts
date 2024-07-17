import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TBlog } from "../utils/types";
import { getArticleById, getArticlesApi } from "../utils/api";

export const getArticlesThunk = createAsyncThunk('blog/getUserApi', await getArticlesApi)

export const getArticleThunk = createAsyncThunk('blog/getArticleApi', 
  async (id: string) => {
    return await getArticleById(id);
  }
)

export interface blogState {
  isLoading: boolean;
  articles: TBlog[];
  article: TBlog;
}

export const initialState: blogState = {
  isLoading: false,
  articles: [],
  article: {
    _id: "",
    name: "",
    title: "",
    image: ""
  }
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  selectors: {
    getArticles: (state) => state.articles,
    getIsLoadint: (state) => state.isLoading,
    getArticle: (state) => state.article,
  },
  extraReducers: (builder) => {
    builder.addCase(getArticlesThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getArticlesThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.articles = payload;
    })
    
    builder.addCase(getArticleThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getArticleThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.article = payload;
    })
  }
})

export const { getArticles, getIsLoadint, getArticle } = blogSlice.selectors;
export const blog = blogSlice.reducer;
