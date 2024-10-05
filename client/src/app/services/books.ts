import { Book } from "@prisma/client";
import { api } from "./api";

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
    getBook: builder.query<Book, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
    }),
    editBook: builder.mutation<string, Book>({
      query: (book) => ({
        url: `/books/edit/${book.id}`,
        method: "PUT",
        body: book,
      }),
    }),
    removeBook: builder.mutation<string, string>({
      query: (id) => ({
        url: `/books/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addBook: builder.mutation<Book, Book>({
      query: (book) => ({
        url: "/books/add",
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useEditBookMutation,
  useRemoveBookMutation,
  useAddBookMutation,
} = booksApi;

export const {
  endpoints: { getAllBooks, getBook, editBook, removeBook, addBook },
} = booksApi;
