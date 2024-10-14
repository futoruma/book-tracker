import { createSlice } from "@reduxjs/toolkit";
import { Book } from "@prisma/client";
import { booksApi } from "../../app/services/books";
import { RootState } from "../../app/store";

interface InitialState {
  books: Book[] | null;
}

const initialState: InitialState = {
  books: null,
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApi.endpoints.getAllBooks.matchFulfilled,
      (state, action) => {
        state.books = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const SelectBooks = (state: RootState) => state.books;
