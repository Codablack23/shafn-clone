import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data{
    [key: string]: any;
}
interface PostState{
    posts:Data[],
    featuredPost:null | Data[],
    recentPost:Data[],
    categories:Data[],
    error:boolean,
}

const initialState: PostState = {
    posts: [],
    featuredPost: null,
    recentPost: [],
    categories: [],
    error: false,
}

interface DataPayload{
    data:Data[]
}
interface ErrorPayload{
    error:boolean
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        get_post_success:(state,action:PayloadAction<DataPayload>)=>{
            state.posts = action.payload.data
        },
        get_featured_post_success:(state,action:PayloadAction<DataPayload>)=>{
            state.featuredPost = action.payload.data
        },
        get_recent_post_success:(state,action:PayloadAction<DataPayload>)=>{
            state.recentPost = action.payload.data
        },
        get_post_categories_success:(state,action:PayloadAction<DataPayload>)=>{
            state.categories = action.payload.data
        },
        get_post_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error
        },
        get_featured_post_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error
        },
        get_recent_post_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error
        },
        get_post_categories_error:(state,action:PayloadAction<ErrorPayload>)=>{
            state.error = action.payload.error
        },
    }
})

export const {
    get_featured_post_error,
    get_featured_post_success,
    get_post_error,
    get_post_categories_error,
    get_post_success,
    get_recent_post_success,
    get_post_categories_success,
    get_recent_post_error
} = postSlice.actions

export default postSlice.reducer