import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Spin, Alert, Button, Popconfirm, Modal, Form, Input, Select} from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import {createSubRequest, deleteSubRequest, fetchSubsRequest, updateSubRequest} from './redux/index.ts';
import { RootState } from '../../../redux/store.ts';
import {Sub} from "./types.ts";

const SubManagement = () => {
    const dispatch = useDispatch();
    const { Column } = Table;
    const { subs, currentPage, pageSize, totalItems, loading: subsLoading, error: subsError } = useSelector((state: RootState) => state.sub);
    // const { subs, loading: subsLoading, error: subsError } = useSelector((state: RootState) => state.sub);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [currentSub, setCurrentSub] = useState(null);
    const [form] = Form.useForm();
    const [ui, setUI] = useState({
        addRecord: false
    })


    useEffect(() => {
        dispatch(fetchSubsRequest({ pageNo: 1, pageSize: 10 }));
    }, [dispatch]);

    const handlePageChange = (newPage: number) => {
        dispatch(fetchSubsRequest({ pageNo: newPage, pageSize: 10 }));
    };

    if (subsLoading) {
        return <Spin size="large" />;
    }

    if (subsError) {
        return <Alert message="Error" description={subsError} type="error" />;
    }

    const handleSearch = async () => {
        const values = await form.validateFields();
        dispatch(fetchSubsRequest({ name: values.name,pageNo: 1, pageSize: 10 }));
    }

    const handleAdd = () => {
        setCurrentSub(null);
        form.resetFields();
        setUI({addRecord: true})
        setOpen(true);
    }

    const handleUpdate = (sub: Sub) => {
        setCurrentSub(sub);
        form.setFieldsValue({
            name: sub.name,
            price: sub.price,
            resolution: sub.resolution,
            maxScreens: sub.maxScreens,
            maxDownloadDevices: sub.maxDownloadDevices
        });
        setUI({addRecord: false})
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteSubRequest(id));
        dispatch(fetchSubsRequest());

    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(async () => {
            setConfirmLoading(false);
            const values = await form.validateFields();
            try {
                if(ui.addRecord) {
                    dispatch(createSubRequest({data: values}));
                }
                else {
                    dispatch(updateSubRequest({id: currentSub.id, data: values}));
                }
                dispatch(fetchSubsRequest());
                setOpen(false);
            } catch (error) {
                console.error('Validation failed:', error);
            } finally {
                setConfirmLoading(false);
            }
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <div>
            <Form form={form}
                  labelCol={{ span: 2 }}
                  labelAlign={"left"}
                  wrapperCol={{ span: 4 }}
                  name="query_sub_form"
            >
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearch()} style={{ marginRight: 8 }}>
                        Search
                    </Button>
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => handleAdd()}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <Table
                dataSource={subs}
                locale={{ emptyText: 'No data available' }}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalItems,
                    showSizeChanger: true,
                    onChange: (page, size) => {
                        dispatch(fetchSubsRequest({ pageNo: page, pageSize: size }));
                    },
                }}
            >
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title='Price' dataIndex='price' key='price' />
                <Column title="Resolution" dataIndex="resolution" key="resolution" />
                <Column title="Screens" dataIndex="maxScreens" key="maxScreens" />
                <Column title="Download Devices" dataIndex="maxDownloadDevices" key="maxDownloadDevices" />
                <Column title="Create At" dataIndex="createAt" key="createAt" />
                <Column title="Update At" dataIndex="updateAt" key="updateAt" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: { id: number; }) => (
                        <span>
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => handleUpdate(record)}
                                style={{ marginRight: 8 }}
                                color="default" variant="solid"
                            >
                                Update
                            </Button>
                            <Popconfirm
                                title="Are you sure to delete this sub?"
                                onConfirm={() => handleDelete(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button icon={<DeleteOutlined />} color="danger" variant="solid">
                                    Delete
                                </Button>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>

            <Modal
                title={ui.addRecord ? "Add new" : "Update"}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form form={form}
                      labelCol={{ span: 8 }}
                      labelAlign={"left"}
                      wrapperCol={{ span: 16 }}
                      name="update_sub_form"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="resolution"
                        label="Resolution"
                        rules={[{ required: true, message: 'Please input resolution!' }]}
                    >
                        <Select
                            options={[
                                { value: '480p', label: '480p' },
                                { value: '720p', label: '720p' },
                                { value: '1080p', label: '1080p' },
                                { value: '4K', label: '4K' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="maxScreens"
                        label="Max Screens"
                        rules={[{ required: true, message: 'Please input max screens!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="maxDownloadDevices"
                        label="Max Download Devices"
                        rules={[{ required: true, message: 'Please input max download devices!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubManagement;
