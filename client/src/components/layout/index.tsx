import { Layout as AntdLayout } from "antd";
import styles from "./index.module.css";
import { Header } from "../header";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntdLayout.Content style={{ height: "100%" }}>
        {children}
      </AntdLayout.Content>
    </div>
  );
};
