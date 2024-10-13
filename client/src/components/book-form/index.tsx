import { Book } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomButton } from "../custom-button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  book?: T;
};

export const BookForm = ({
  onFinish,
  title,
  btnText,
  error,
  book,
}: Props<Book>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="book-form" onFinish={onFinish} initialValues={book}>
        <CustomInput type="text" name="title" placeholder="title" />
        <CustomInput type="text" name="author" placeholder="author" />
        <CustomInput type="text" name="language" placeholder="language" />
        <CustomInput type="text" name="description" placeholder="description" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
