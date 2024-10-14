import { Card, Form, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@prisma/client";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { ErrorMessage } from "../../components/error-message";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { Paths } from "../../paths";
import { selectUser } from "../../features/auth/authSlice";
import { useSignupMutation } from "../../app/services/auth";

type SignupData = Omit<User, "id"> & { confirmPassword: string };

export const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [signupUser] = useSignupMutation();

  const signup = async (data: SignupData) => {
    try {
      await signupUser(data).unwrap();
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
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={signup}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <CustomButton type="primary" htmlType="submit">
              Submit
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already have an account? <Link to={Paths.login}>Log in here</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
