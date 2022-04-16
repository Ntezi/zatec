import { configureStore } from '@reduxjs/toolkit';
import jokeCategoryReducer from "../features/jokes_category/jokesCategorySlice";
import swPeopleReducer from "../features/sw_people/swPeopleSlice";

export const store = configureStore({
  reducer: {
    categories: jokeCategoryReducer,
    people: swPeopleReducer,
  },
});
