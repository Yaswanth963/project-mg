import React from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../hooks/useHttpClient';
import planetImage from '../../assets/images/planet.jpeg'
import { UserRole } from '../../utils';


type FieldType = {
    username?: string;
    password?: string;
};

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden; 
`;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useHttpClient();

    const onFinish = (values: any) => {
        const req = {
            username: values.username,
            password: values.password
        }
        login(req)
            .then(res => {
                const token = res?.data?.token;
                const role = res?.data.role;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", req?.username);
                localStorage.setItem("userRole", role?.role);
                localStorage.setItem("username", role?.username);
                if (role?.role === UserRole.REVIEWER) {
                    navigate("/reviewer")
                }
                else if (role?.role === UserRole.USER) {
                    navigate("/user")
                }
                else {
                    navigate("/login")
                }
            })
            .catch(res => {
                message.error('Incorrect username or password');
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed to login:', errorInfo);
    };

    return (
        <div style={{
            height: '100vh', display: 'flex', flexDirection: 'column',
            backgroundImage: `url(${planetImage})`,
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
                <div style={{ border: '1px solid grey', padding: 40, borderRadius: 8, color: 'white' }}>
                    <Typography.Title type='secondary' style={{ fontSize: 30, textAlign: 'center', marginBottom: 30, color: 'white' }}>Login</Typography.Title>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Username</span>}
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" ghost>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Typography.Text style={{ color: 'white' }}>not registered yet?&nbsp;&nbsp;
                        <Link to="/signup" style={{ color: '#FFFFFF' }}><u>Signup</u></Link>
                    </Typography.Text>
                </div>
            </StyledDiv>
        </div>
    )
};

export default Login;
