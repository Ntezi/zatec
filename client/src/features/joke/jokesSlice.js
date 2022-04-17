import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "../../app/api";
import {SEARCH_API} from "../../app/constants";

const initialState = [];
export const fetchJoke = createAsyncThunk('jokes/fetchJoke', async (query) => {
    console.log("joke", query)
    const response = await get(`${SEARCH_API}?category=${query}`);
    const jokes = response.data.chuck
    const random = Math.floor(Math.random() * jokes.length);
    return jokes[random];
});

const jokeSlice = createSlice({
    name: 'joke',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchJoke.fulfilled, (state, action) => {
                return action.payload;
            })
    }
});

export const selectJoke = (state) => state.joke;

export default jokeSlice.reducer
