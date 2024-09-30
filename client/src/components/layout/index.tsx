import styles from "./index.module.css";
import { Layout as AntdLayout } from "antd";

type Props = {
    children: React.ReactNode
}

export const Layout = ({ children}: Props) => {
    return (
        <div className={ styles.main }>
            <AntdLayout.Content style={{ height: "100%" }}>
                { children }    
            </AntdLayout.Content>
        </div>
    )
}