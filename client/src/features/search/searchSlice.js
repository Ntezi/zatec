import React from "react";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "../../app/api";
import {SEARCH_API} from "../../app/constants";

const initialState = [];
export const fetchResults = createAsyncThunk('search/fetchResults', async (query) => {

    const response = await get(`${SEARCH_API}?query=${query}`);

    const results = [];

    if (response.data.chuck) {
        response.data.chuck.map(function (joke) {
            return results.push({
                name: joke.value,
                origin: "Chuck Norris Jokes API"
            })
        });
    }

    if (response.data.swapi) {
        response.data.swapi.map(function (people) {
            return results.push({
                name: people.name,
                origin: "Star Wars People"
            })
        });
    }

    return results;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchResults.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                return action.payload;
            })
    }
});

export const search = (state) => state.search;

export default searchSlice.reducer
