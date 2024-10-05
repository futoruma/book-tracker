import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useState } from "react";
import { ErrorMessage } from "../../components/error-message";

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign in" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Submit
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account yet? <Link to={Paths.signup}>Sign up here</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
