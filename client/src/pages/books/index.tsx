import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { useGetAllBooksQuery } from "../../app/services/books";
import type { ColumnsType } from "antd/es/table";
import { Book } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

const columns: ColumnsType<Book> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "description",
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

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={() => null}
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
