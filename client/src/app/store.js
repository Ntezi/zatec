import { configureStore } from '@reduxjs/toolkit';
import jokeCategoryReducer from "../features/jokes_category/jokesCategorySlice";
import swPeopleReducer from "../features/sw_people/swPeopleSlice";
import jokeReducer from "../features/joke/jokesSlice";

export const store = configureStore({
  reducer: {
    categories: jokeCategoryReducer,
    people: swPeopleReducer,
    joke: jokeReducer,
  },
});
