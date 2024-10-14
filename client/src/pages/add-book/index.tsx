import { Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Book } from "@prisma/client";
import { BookForm } from "../../components/book-form";
import { Layout } from "../../components/layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";
import { selectUser } from "../../features/auth/authSlice";
import { useAddBookMutation } from "../../app/services/books";

export const AddBook = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addBook] = useAddBookMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleAddBook = async (data: Book) => {
    try {
      await addBook(data).unwrap();
      navigate(`${Paths.status}/created`);
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
        <BookForm title="Add book" btnText="Add" onFinish={handleAddBook} />
      </Row>
    </Layout>
  );
};
