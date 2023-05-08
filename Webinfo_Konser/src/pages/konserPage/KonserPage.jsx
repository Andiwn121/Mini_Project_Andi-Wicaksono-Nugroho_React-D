import React, { useState, useEffect } from "react";
import "./konser.css";
import {
  Row,
  Card,
  Form,
  Button,
  Input,
  Select,
  Radio,
  Space,
  Upload,
  Table,
  DatePicker,
  Popconfirm,
} from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CardHeaderOneComponent } from "../../components/layouts/header/headerForm/Index";
import {
  GET_KONSER,
  ADD_KONSER,
  DELETE_KONSER,
  UPDATE_KONSER,
} from "./query/konser-query";
import { uploaderConfig } from "../../config/uploaderConfig";
import { useSingleUploader } from "../../hooks/useSingleUploader";
import LoadingComponent from "../../components/layouts/loading/LoadingComponent";
import { useQuery, useMutation } from "@apollo/client";
import { INITIAL_TABLE_DATA } from "./Constant";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import moment from "moment";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const KonserPage = () => {
  const { TextArea } = Input;
  const [formKonser] = Form.useForm();
  const MySwal = withReactContent(Swal);
  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState("");

  //   const [tanggal, setTanggal] = useState("");
  const dateFormat = "DD MMMM YYYY";

  //   GraphQL
  const {
    data: konserData,
    loading: isKonserLoading,
    error: isKonserError,
  } = useQuery(GET_KONSER);

  // const defaultValue = dayjs(row_data.tanggal).toDate();

  const [addKonser, { loading: isCreateLoading }] = useMutation(ADD_KONSER, {
    refetchQueries: [GET_KONSER],
  });

  const [deleteKonser, { loading: isDeleteLoading }] = useMutation(
    DELETE_KONSER,
    {
      refetchQueries: [GET_KONSER],
    }
  );

  const [updateKonser, { loading: isUpdateLoading }] = useMutation(
    UPDATE_KONSER,
    {
      refetchQueries: [GET_KONSER],
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
      title: "Nama Konser",
      dataIndex: "namaKonser",
      key: "namaKonser",
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
      title: "Deskripsi Konser",
      dataIndex: "deskripsi",
      key: "deskripsi",
    },
    {
      title: "Tanggal Konser",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi",
      key: "lokasi",
    },
    {
      title: "Link Tiket",
      dataIndex: "linkTiket",
      key: "linkTiket",
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

    // Konversi tanggal dari string ISO menjadi objek Date
    const date = new Date(row_data.tanggal);

    // Format tanggal ke dalam string dengan format yang sesuai dengan datepicker
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    formKonser.setFieldsValue({
      firstName: row_data.firstName,
      namaKonser: row_data.namaKonser,
      deskripsi: row_data.deskripsi,
      tanggal: moment(formattedDate),
      lokasi: row_data.lokasi,
      linkTiket: row_data.linkTiket,
    });
  };

  const handleCancel = () => {
    setRowData();
    setAvatar("");
    setIsEdit(false);
    formKonser.resetFields();
  };

  //   Add Data
  const onAdd = (values) => {
    const body = {
      avatar: avatar,
      ...values,
    };
    addKonser({
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
      onAddCompleted: () => {
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

    updateKonser({
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
      onUpdateCompleted: () => {
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
    deleteKonser({
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
    if (isKonserError) {
      MySwal.fire({
        icon: "error",
        title: "Error!",
        text: `${isKonserError?.message}`,
      });
    }
  }, [isKonserError]);

  return (
    <>
      <CardHeaderOneComponent>
        <span>Data Konser</span>
      </CardHeaderOneComponent>
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
                form={formKonser}
                onFinish={isEdit ? onEdit : onAdd}
                labelAlign="left"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                {/* Nama Konser */}
                <Form.Item
                  label="Nama Konser"
                  name="namaKonser"
                  rules={[
                    {
                      required: true,
                      message: "Nama konser harus diisi!",
                    },
                    {
                      pattern: /^[\w\s]{1,50}$/,
                      message:
                        "Nama produk tidak boleh lebih dari 50 karakter!",
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

                {/* Deskripsi */}
                <Form.Item
                  label="Deskripsi Konser"
                  name="deskripsi"
                  rules={[
                    { required: true, message: "Deskripsi harus diisi!" },
                  ]}
                >
                  <TextArea rows={4}></TextArea>
                </Form.Item>

                {/* Tanggal */}
                <Form.Item
                  label="Tanggal Konser"
                  name="tanggal"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal harus diisi!",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>

                {/* Lokasi */}
                <Form.Item
                  label="Lokasi"
                  name="lokasi"
                  rules={[
                    {
                      required: true,
                      message: "Lokasi harus diisi!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* Link Tiket */}
                <Form.Item
                  label="Link Pembelian Tiket"
                  name="linkTiket"
                  rules={[
                    {
                      required: true,
                      message: "Link Pembelian Tiket harus diisi!",
                    },
                  ]}
                >
                  <Input />
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
              dataSource={konserData?.konser}
              loading={isKonserLoading || isDeleteLoading}
            />
          </Card>

          {konserData &&
            konserData.konser &&
            konserData.konser.map((item) => (
              <span>{dayjs(item.tanggal).format("DD MMMM YYYY")}</span>
            ))}
        </Space>
      </Row>
    </>
  );
};

export default KonserPage;
