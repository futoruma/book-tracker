import { Card, Form, Row } from "antd";
import { Layout } from "../../components/layout";

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Enter" style={{ width: "30rem" }}>
          <Form onFinish={() => null}></Form>
        </Card>
      </Row>
    </Layout>
  );
};
