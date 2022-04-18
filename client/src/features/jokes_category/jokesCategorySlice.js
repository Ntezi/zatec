import React from "react";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {get} from "../../app/api";
import {CHUCK_API} from "../../app/constants";

const initialState = [];
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const categories = await get(`${CHUCK_API}`);
    return categories.data;
});

const jokesCategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                // state.status = 'succeeded'
                return action.payload;
            })
    }
});

export const selectAllCategories = (state) => state.categories;

export default jokesCategorySlice.reducer
