import React, { useState, useEffect } from "react";
import "./artis.css";
import {
  Row,
  Card,
  Form,
  Button,
  Input,
  Space,
  Upload,
  Table,
  Popconfirm,
} from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CardHeaderTwoComponent } from "../../components/layouts/header/headerForm/Index";
import {
  GET_ARTIS,
  ADD_ARTIS,
  DELETE_ARTIS,
  UPDATE_ARTIS,
} from "./query/artis-query";
import { uploaderConfig } from "../../config/uploaderConfig";
import { useSingleUploader } from "../../hooks/useSingleUploader";
import LoadingComponent from "../../components/layouts/loading/LoadingComponent";
import { useQuery, useMutation } from "@apollo/client";
import { INITIAL_TABLE_DATA } from "./Constant";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ArtisPage = () => {
  const [formArtis] = Form.useForm();
  const MySwal = withReactContent(Swal);
  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState("");

  //   GraphQL
  const {
    data: artisData,
    loading: isArtisLoading,
    error: isArtisError,
  } = useQuery(GET_ARTIS);

  const [addArtis, { loading: isCreateLoading }] = useMutation(ADD_ARTIS, {
    refetchQueries: [GET_ARTIS],
  });

  const [deleteArtis, { loading: isDeleteLoading }] = useMutation(
    DELETE_ARTIS,
    {
      refetchQueries: [GET_ARTIS],
    }
  );

  const [updateArtis, { loading: isUpdateLoading }] = useMutation(
    UPDATE_ARTIS,
    {
      refetchQueries: [GET_ARTIS],
    }
  );

  const [isLoadingUpload, uploadFile] = useSingleUploader();

  // Tabel
  const TABLE_COLUMNS = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Nama Artis",
      dataIndex: "namaArtis",
      key: "namaArtis",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record, index) => (
        <img
          src={record.avatar}
          alt={`avatar-${index}`}
          style={{ height: "30px" }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        INITIAL_TABLE_DATA.length >= 1 ? (
          <Space>
            <Button type="primary" onClick={() => handleEdit(record)}>
              <SettingOutlined />
            </Button>
            <Popconfirm
              title="Sure to delete?"
              arrow={false}
              onConfirm={() => onDelete(record.uuid)}
            >
              <Button type="primary" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  const handleEdit = (row_data) => {
    setRowData(row_data);
    setIsEdit(true);
    setAvatar(row_data.avatar);

    formArtis.setFieldsValue({
      namaArtis: row_data.namaArtis,
    });
  };

  const handleCancel = () => {
    setRowData();
    setAvatar("");
    setIsEdit(false);
    formArtis.resetFields();
  };

  //   Add Data
  const onAdd = (values) => {
    const body = {
      avatar: avatar,
      ...values,
    };
    addArtis({
      variables: {
        object: {
          ...body,
        },
      },
      onError: (err) => {
        MySwal.fire({
          icon: "error",
          title: "Gagal!",
          text: `${err.message}`,
        });
      },
      onCompleted: () => {
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan!",
        });
        handleCancel();
      },
    });
  };

  //   Edit Data
  const onEdit = (values) => {
    const uuid = rowData.uuid;
    const body = {
      avatar: avatar,
      ...values,
    };

    updateArtis({
      variables: { pk_columns: { uuid: uuid }, _set: { ...body } },
      onCompleted: () => {
        handleCancel();
      },
      onError: (err) => {
        MySwal.fire({
          icon: "error",
          title: "Gagal!",
          text: `${err.message}`,
        });
      },
      onCompleted: () => {
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diubah!",
        });
        handleCancel();
      },
    });
  };

  //   Delete Data
  const onDelete = (row_id) => {
    deleteArtis({
      variables: { uuid: row_id },
      onError: (err) => {
        MySwal.fire({
          icon: "error",
          title: "Gagal!",
          text: `${err.message}`,
        });
      },
      onCompleted: () => {
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus!",
        });
      },
    });
  };

  const handleUpload = async (file) => {
    const body = {
      file: await getBase64(file.file.originFileObj),
      upload_preset: uploaderConfig.upload_preset,
      public_id: file.file.name.replace(/\.[^.]*$/, ""),
      api_key: uploaderConfig.api_key,
    };
    uploadFile(body, (data) => {
      setAvatar(data.url);
    });
  };

  useEffect(() => {
    if (isArtisError) {
      MySwal.fire({
        icon: "error",
        title: "Error!",
        text: `${isArtisError?.message}`,
      });
    }
  }, [isArtisError]);

  return (
    <>
      <CardHeaderTwoComponent>
        <span>Data Artis</span>
      </CardHeaderTwoComponent>
      <Row justify="center">
        <Space direction="vertical">
          <Row justify="center">
            <Card
              hoverable
              bordered={false}
              style={{
                width: "715px",
              }}
            >
              <Form
                layout="horizontal"
                name="form-concert"
                form={formArtis}
                onFinish={isEdit ? onEdit : onAdd}
                labelAlign="left"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                {/* Nama Artis */}
                <Form.Item
                  label="Nama Artis"
                  name="namaArtis"
                  rules={[
                    {
                      required: true,
                      message: "Nama artis harus diisi!",
                    },
                    {
                      pattern: /^[\w\s]{1,50}$/,
                      message:
                        "Nama artis tidak boleh lebih dari 50 karakter!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* Image */}
                <Form.Item label="Avatar">
                  <Upload
                    showUploadList={false}
                    name="file"
                    maxCount={1}
                    onRemove={() => {
                      setAvatar("");
                    }}
                    customRequest={() => {}}
                    onChange={handleUpload}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      type={!avatar ? "dashed" : "default"}
                    >
                      {avatar ? "Change Avatar" : "Upload Avatar"}
                    </Button>
                  </Upload>

                  {isLoadingUpload ? (
                    <LoadingComponent />
                  ) : (
                    avatar && (
                      <div>
                        <img
                          src={avatar}
                          alt="avatar"
                          style={{
                            height: "150px",

                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    )
                  )}
                </Form.Item>

                <Row justify="start">
                  {isEdit ? (
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                      <Button type="danger" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Space>
                  ) : (
                    <Button
                      type="primary"
                      className="btn-enter"
                      htmlType="Submit"
                      loading={isCreateLoading}
                    >
                      Submit
                    </Button>
                  )}
                </Row>
              </Form>
            </Card>
          </Row>

          <Card hoverable>
            <Table
              rowKey="uuid"
              columns={TABLE_COLUMNS}
              dataSource={artisData?.artis}
              loading={isArtisLoading || isDeleteLoading}
            />
          </Card>
        </Space>
      </Row>
    </>
  );
};

export default ArtisPage;
