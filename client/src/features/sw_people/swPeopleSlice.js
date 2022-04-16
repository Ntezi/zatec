import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "../../app/api";
import {SW_API} from "../../app/constants";

const initialState = [];
export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
    const people = await get(`${SW_API}`);
    return people.data;
});

const swPeopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPeople.fulfilled, (state, action) => {
                return action.payload;
            })
    }
});

export const selectAllPeople = (state) => state.people;

export default swPeopleSlice.reducer
