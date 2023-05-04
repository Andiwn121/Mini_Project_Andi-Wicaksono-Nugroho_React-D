import { Row, Button, Card, Checkbox, Form, Input, Radio } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./loginPage.css";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "./query/profile-query";
import Modal from "antd/es/modal/Modal";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LoginPage = () => {
  const MySwal = withReactContent(Swal)
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [section, setSection] = useState("Login");

  // GraphQL
  const {
    data: profileData,
    loading: isProfileLoading,
    error: isProfileError,
  } = useQuery(GET_PROFILE);

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
        icon: 'error',
        title: "Login failed!",
        text: "Username/password is not correct.",
        onOk() {
          setSection("Login");
        },
      });
    }
  };

  const onRegister = (values) => {};

  const onChange = ({ target: { value } }) => {
    setSection(value);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-center">
      <Card title="Login" style={{ width: "400px" }}>
        <Row justify="center" align="middle">
          <Radio.Group
            defaultValue="Login"
            optionType="button"
            buttonStyle="solid"
            onChange={onChange}
            value={section}
          >
            <Radio.Button value="Login">Login Here</Radio.Button>
            <Radio.Button value="Register">Register Here</Radio.Button>
          </Radio.Group>
        </Row>

        <Form
          name="login-form"
          form={form}
          onFinish={section === "Login" ? onLogin : onRegister}
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
            <Input.Password prefix={<LockOutlined />} placeholder="Username" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {section === "Login" ? "Login" : "Register"}
          </Button>
        </Form>
      </Card>

      {/* <Card title="Login Page" bodyStyle={{ width: "400px" }}>
        <Button type="primary" onClick={onLogin}>
          Login
        </Button>
      </Card> */}
    </div>
  );
};

export default LoginPage;
