import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Book } from "@prisma/client";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { useGetAllBooksQuery } from "../../app/services/books";
import { Paths } from "../../paths";
import { selectUser } from "../../features/auth/authSlice";

const columns: ColumnsType<Book> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

export const Books = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllBooksQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const goToAddBook = () => navigate(Paths.bookAdd);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddBook}
        icon={<PlusCircleOutlined />}
      >
        Add
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(book) => book.id}
        onRow={(book) => {
          return {
            onClick: () => navigate(`${Paths.book}/${book.id}`),
          };
        }}
      />
    </Layout>
  );
};
