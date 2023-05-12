import { Space, Button, Card, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./loginPage.css";
import { Data_Konser } from "../../assets/Index";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "./query/profile-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const LoginPage = () => {
  const MySwal = withReactContent(Swal);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // GraphQL
  const { data: profileData } = useQuery(GET_PROFILE);

  const onLogin = (values) => {
    const profile = [...profileData?.profile];

    // mengecek apakah user ada
    const isUser = profile?.find((item) => item.username === values.username);

    const isVerified = JSON.stringify(isUser) === JSON.stringify(values);

    if (isVerified) {
      localStorage.setItem("token", true);
      navigate("/home");
    } else {
      MySwal.fire({
        icon: "error",
        title: "Login failed!",
        text: "Username/password is not correct.",
        onOk() {
          setSection("Login");
        },
      });
    }
  };

  return (
    <div className="container-login">
      <div className="container-center">
      <Space direction="horizontal">
        <img src={Data_Konser} alt="login image" className="sideLogin" />

        <Card title="Login Admin" style={{ width: "400px", height:"350px" }}>
          <Form
            name="login-form"
            form={form}
            onFinish={onLogin}
            style={{ marginTop: "25px" }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Username"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="btn-login">
              Login
            </Button>
          </Form>
        </Card>
      </Space>
    </div>
    </div>
  );
};

export default LoginPage;
