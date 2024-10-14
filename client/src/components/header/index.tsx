import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { CustomButton } from "../custom-button";
import { logout, selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      {user ? (
        <CustomButton
          type="primary"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Logout
        </CustomButton>
      ) : (
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
      )}
    </AntdLayout.Header>
  );
};
