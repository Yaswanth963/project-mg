import React, { useContext, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Input, Form, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import styled from '@emotion/styled';
import { useForm } from 'antd/es/form/Form';
import { useHttpClient } from '../hooks/useHttpClient';
import { Project } from '../utils';
import moment from 'moment';
import { AuthContext } from '../Context/authContext';

const { Dragger } = Upload;

const allowedFileTypes = ['.mp4', 'image/jpeg', 'image/png', 'image/jpg'];

const UploadFile: React.FC = () => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const { uploadFile, uploadProject } = useHttpClient();
    const { userData } = useContext(AuthContext);

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Received values from form:', values);

        uploadFile(values?.file)
            .then(res => {
                alert('File uploaded successfully');
                const assetUrl = res?.data?.fileUrl;
                const project: Project = {
                    projectName: values?.projectName,
                    projectDescription: values?.description,
                    userId: userData.userId,
                    projectAssetUrl: assetUrl,
                    projectAssetSize: values?.file?.size / 1024 / 1024,
                    dateOfSubmission: moment().format('DD-MM-YYYY'),
                    submittedBy: userData.username
                }
                uploadProject(project)
                    .then(res => {
                        alert('Project Uploaded successfully');
                    })
                    .catch(err => {
                        // Delete file from s3 if failed to uplaod project metadata
                        console.log('Failed to upload project');
                    })
            })
            .catch(err => {
                console.log('Error uplaoding file');
            })

        setTimeout(() => {
            form.resetFields();
            setLoading(false);
        }, 3000)
    };

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: allowedFileTypes.join(','),
        maxCount: 1,
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log('File Info', info);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        beforeUpload(file) {
            const extension = file.name.split('.').pop()?.toLowerCase();
            const isAllowedExtension = extension ? ['mp4', 'jpeg', 'png', 'jpg'].includes(extension) : false;

            if (!extension || !isAllowedExtension) {
                message.error(`Unsupported file type: ${file.name}`);
                return Upload.LIST_IGNORE;
            }

            const fileSizeMB = file.size / 1024 / 1024;
            const maxFileSizeMB = 20;

            if (fileSizeMB > maxFileSizeMB) {
                message.error(`File size exceeds the maximum limit of ${maxFileSizeMB}MB.`);
                return Upload.LIST_IGNORE;
            }

            return true;
        },
    };

    const validateProjectDescription = (_: any, value: any) => {
        // Split the value into words and check if there are at least 20 words
        const words = value.trim().split(/\s+/);
        if (words.length < 20) {
            return Promise.reject('Project description must contain at least 20 words');
        }
        return Promise.resolve();
    };

    return (
        <StyledDiv>
            <Form form={form} onFinish={onFinish} layout='vertical'>
                <Form.Item
                    label="Project Name"
                    name="projectName"
                    rules={[{ required: true, message: 'Please enter project name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Project Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Please enter project description' },
                        { validator: validateProjectDescription }
                    ]}
                >
                    <TextArea rows={7} />
                </Form.Item>
                <Form.Item style={{ marginTop: '5px', float: 'right' }}>
                    <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                </Form.Item>
                <Form.Item
                    label="Project File"
                    name="file"
                >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or Drag here to upload</p>
                        <p className="ant-upload-hint">
                            Allowed file types .zip, .mp4, .jpeg, .png
                        </p>
                    </Dragger>
                </Form.Item>
            </Form>
        </StyledDiv >
    );
};



const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40vh;
`;
const FormContainer = styled.div`
    width: 45%;
    margin-right: 20px; /* Adjust spacing between form and Dragger */
`;

const DraggerContainer = styled.div`
    width: 50%;
`;


export default UploadFile;