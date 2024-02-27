import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import styled from '@emotion/styled';
import { User } from '../utils';
import { useHttpClient } from '../hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileUpdate: React.FC = () => {

    const [profile, setProfile] = useState<User>();
    const { getUser, updateUser } = useHttpClient();
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);

    const onFinish = (values: any) => {
        const req = {
            email: values?.email,
            password: values?.password
        }
        updateUser(profile?.rollNo, req)
            .then(res => {
                alert('User Data Updated Successfully');
                localStorage.clear();
                navigate("/");
            })
            .catch(err => {
                console.log('User Updation failed');
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId") || userData.userId;
        getUser(userId)
            .then(res => {
                const user = res?.data;
                setProfile(user);
            })
            .catch(err => {
                console.log('User details not found');
            })
    }, [])

    if (!profile) {
        return null
    }

    return (
        <StyledDiv>
            <div style={{ border: '1px solid grey', padding: 40, borderRadius: 8 }}>
                <Typography.Title type='secondary' style={{ fontSize: 30, textAlign: 'center', marginBottom: 30 }}>Update Profile</Typography.Title>
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ message: 'Please input your name!' }]}
                        labelAlign='left'
                    >
                        <Input defaultValue={profile?.name} value={profile?.name} disabled />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        labelAlign='left'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        labelAlign='left'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                        labelAlign='left'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Roll No"
                        name="rollNo"
                        rules={[{ required: false, message: 'Please input your roll number!' }]}
                        labelAlign='left'
                    >
                        <Input disabled defaultValue={profile?.rollNo} value={profile?.rollNo} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </StyledDiv>
    );
};

export default ProfileUpdate;
