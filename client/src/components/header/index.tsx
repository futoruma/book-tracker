import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout as AntdLayout, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { CustomButton } from "../custom-button";
import { Paths } from "../../paths";
import styles from "./index.module.css";

export const Header = () => {
  return (
    <AntdLayout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="primary">
            <Typography.Title level={3}>Books</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.signup}>
          <CustomButton type="primary" icon={<UserOutlined />}>
            Sign Up
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="primary" icon={<LoginOutlined />}>
            Login
          </CustomButton>
        </Link>
      </Space>
    </AntdLayout.Header>
  );
};
