import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Spin, Alert, Button, Popconfirm, Modal, Form, Input} from 'antd';
import {EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {fetchUserRequest, fetchUsersRequest, updateUserRequest} from './redux/index.ts';
import { RootState } from '../../../redux/store.ts';
import {User} from "./types.ts";

const UserManagement = () => {
    const dispatch = useDispatch();
    const { users, loading: usersLoading, error: usersError, currentPage, pageSize, totalItems } = useSelector((state: RootState) => state.user);
    const { profiles, loading: profilesLoading, error: profilesError } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [form] = Form.useForm();


    useEffect(() => {
        dispatch(fetchUsersRequest({ pageNo: 1, pageSize: 10 }));
    }, [dispatch]);

    if (usersLoading) {
        return <Spin size="large" />;
    }

    if (usersError) {
        return <Alert message="Error" description={usersError} type="error" />;
    }

    const handleSearch = async () => {
        const values = await form.validateFields();
        dispatch(fetchUsersRequest({ email: values.email, pageNo: 1, pageSize: 10 }));
    }

    const handleDetail = (user: User) => {
        setCurrentUser(user);
        form.setFieldsValue({
            email: user.email,
        });
        console.log("id ",  typeof user.id);
        dispatch(fetchUserRequest({ id: user.id }));
        setOpen(true);
    };

    const handleDelete = (userId: number) => {
        console.log("Delete user with ID:", userId);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            try {
                dispatch(updateUserRequest({id: currentUser.id, data: currentUser}));

                setOpen(false);
            } catch (error) {
                // message.error('Please fill in the required fields');
            } finally {
                setConfirmLoading(false);
            }
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const userColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Create At', dataIndex: 'createAt', key: 'createAt' },
        { title: 'Update At', dataIndex: 'updateAt', key: 'updateAt' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="primary" shape="circle" style={{ marginRight: 8 }} onClick={() => handleDetail(record)}>i</Button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} color="danger" variant="solid">
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const profileColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Language', dataIndex: 'language', key: 'language' },
        { title: 'Age', dataIndex: 'ageRating', key: 'ageRating' },
        { title: 'Create At', dataIndex: 'createAt', key: 'createAt' },
    ];

    return (
        <div>
            <Form form={form}
                  labelCol={{ span: 2 }}
                  labelAlign={"left"}
                  wrapperCol={{ span: 4 }}
                  name="query_sub_form"
            >
                <Form.Item name="email" label="Email">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearch()}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
            <Table
                dataSource={Array.isArray(users) ? users : []}
                columns={userColumns}
                rowKey="id"
                locale={{ emptyText: 'No data available' }}
            />

            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="update_user_form">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Table
                        dataSource={Array.isArray(profiles) ? profiles : []}
                        columns={profileColumns}
                        rowKey="id"
                        locale={{ emptyText: 'No data available' }}
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
