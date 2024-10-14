import { Descriptions, Divider, Modal, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../components/custom-button";
import { ErrorMessage } from "../../components/error-message";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";
import { selectUser } from "../../features/auth/authSlice";
import {
  useGetBookQuery,
  useRemoveBookMutation,
} from "../../app/services/books";

export const Book = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetBookQuery(params.id || "");
  const [removeBook] = useRemoveBookMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteBook = async () => {
    hideModal();

    try {
      await removeBook(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Book Information" bordered>
        <Descriptions.Item
          label="Title"
          span={3}
        >{`${data.title}`}</Descriptions.Item>
        <Descriptions.Item
          label="Author"
          span={3}
        >{`${data.author}`}</Descriptions.Item>
        <Descriptions.Item
          label="Language"
          span={3}
        >{`${data.language}`}</Descriptions.Item>
        <Descriptions.Item
          label="Description"
          span={3}
        >{`${data.description}`}</Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`/book/edit/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Edit
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Delete
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error}></ErrorMessage>
      <Modal
        title="Confirmation"
        open={isModalOpen}
        onOk={handleDeleteBook}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Are you sure you want to delete this book?
      </Modal>
    </Layout>
  );
};
