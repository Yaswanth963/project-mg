import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import styled from '@emotion/styled';
import { User } from '../../utils';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import earthImage from '../../assets/images/earth3.jpeg'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
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
                message.info('User Data Updated Successfully');
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
        <div style={{
            height: '100vh', display: 'flex', flexDirection: 'column',
            backgroundImage: `url(${earthImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
        }}>
            {/* Logo Svg Start */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                onClick={() => { navigate("/") }}
                style={{ position: 'relative', top: 40, left: 40, cursor: 'pointer' }}
            >
                <g clip-path="url(#clip0_3_9)">
                    <path d="M9 15V23H1V15H9ZM23 15V23H15V15H23ZM9 1V9H1V1H9ZM23 1V9H15V1H23Z" stroke="#FFFFFF" stroke-width="2" />
                </g>
                <defs>
                    <clipPath id="clip0_3_9">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            {/* Logo Svg Start */}
            <StyledDiv>
                <div style={{ border: '1px solid grey', padding: 40, borderRadius: 8 }}>
                    <Typography.Title type='secondary' style={{ fontSize: 30, textAlign: 'center', marginBottom: 30, color: 'white' }}>Update Profile</Typography.Title>
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
                            label={<span style={{ color: '#FFFFFF' }}>Name</span>}
                            name="name"
                        labelAlign='left'
                    >
                            <Input
                                defaultValue={profile?.name}
                                value={profile?.name}
                                disabled
                                style={{ color: '#FFFFFF' }}
                            />
                    </Form.Item>


                    <Form.Item
                            label={<span style={{ color: '#FFFFFF' }}>Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        labelAlign='left'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                            label={<span style={{ color: '#FFFFFF' }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        labelAlign='left'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                            label={<span style={{ color: '#FFFFFF' }}>Confirm Password</span>}
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
                            label={<span style={{ color: '#FFFFFF' }}>Roll No</span>}
                        name="rollNo"
                        rules={[{ required: false, message: 'Please input your roll number!' }]}
                        labelAlign='left'
                    >
                            <Input disabled defaultValue={profile?.rollNo} value={profile?.rollNo} style={{ color: '#FFFFFF' }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" ghost>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </StyledDiv>
        </div>
    );
};

export default ProfileUpdate;
