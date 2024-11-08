import { Row } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "@prisma/client";
import { useEditBookMutation, useGetBookQuery } from "../../app/services/books";
import { BookForm } from "../../components/book-form";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";

export const EditBook = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetBookQuery(params.id || "");
  const [editBook] = useEditBookMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleEditBook = async (book: Book) => {
    try {
      const editedBook = {
        ...data,
        ...book,
      };

      await editBook(editedBook).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Unknown error.");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <BookForm
          title="Edit book"
          btnText="Edit"
          error={error}
          book={data}
          onFinish={handleEditBook}
        ></BookForm>
      </Row>
    </Layout>
  );
};
