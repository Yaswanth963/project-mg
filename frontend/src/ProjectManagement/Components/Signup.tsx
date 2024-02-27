import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { UserRole } from '../utils';
import { useHttpClient } from '../hooks/useHttpClient';
import blackHole from '../assets/images/moon.jpeg'

type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    rollNo?: string;
    role: UserRole
};

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Signup: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useHttpClient();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoading(true);
        signup(values)
            .then(res => {
                setLoading(false);
                navigate('/');
            })
            .catch(err => {
                setLoading(false);
                navigate('/signup');
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            height: '100vh', display: 'flex', flexDirection: 'column',
            backgroundImage: `url(${blackHole})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
        }}>
            <StyledDiv>
                {!loading && <div style={{ border: '1px solid grey', padding: 40, borderRadius: 8 }}>
                    <Typography.Title type='secondary' style={{ fontSize: 30, textAlign: 'center', marginBottom: 30, color: 'white' }}>Signup</Typography.Title>
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Name</span>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            labelAlign='left'
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Email</span>}
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                            labelAlign='left'
                        >
                            <Input type="email" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            labelAlign='left'
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Confirm Password</span>}
                            name="confirmPassword"
                            dependencies={['password']}
                            labelAlign='left'
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
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span style={{ color: '#FFFFFF' }}>Roll No</span>}
                            name="rollNo"
                            rules={[{ required: true, message: 'Please input your roll number!' }]}
                            labelAlign='left'
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" ghost>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Typography.Text style={{ color: '#FFFFFF' }}>
                        Already have an accounnt?&nbsp;&nbsp;
                        <Link to="/login" style={{ color: '#FFFFFF' }}><u>Login</u></Link>
                    </Typography.Text>
                </div>}
                {
                    loading && (
                        <>
                            <Typography.Paragraph>Saving data hold on for a while</Typography.Paragraph>
                            <PropagateLoader color="#36D7B7" loading={true} />
                        </>
                    )
                }
            </StyledDiv >
        </div >
    )
};

export default Signup;
