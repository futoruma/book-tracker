import { LogoutOutlined, BookOutlined } from "@ant-design/icons";
import { Layout as AntdLayout, Space } from "antd";
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
      {user ? (
        <>
          <Space>
            <Link to={Paths.home}>
              <BookOutlined className={styles.teamIcon} />
            </Link>
          </Space>
          <CustomButton
            type="primary"
            icon={<LogoutOutlined />}
            onClick={onLogoutClick}
          >
            Logout
          </CustomButton>
        </>
      ) : (
        <Space></Space>
      )}
    </AntdLayout.Header>
  );
};
