import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Form, message, Upload, Button } from 'antd';
import styled from '@emotion/styled';
import { useHttpClient } from '../hooks/useHttpClient';
import { useForm } from 'antd/es/form/Form';
const { Dragger } = Upload;

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    padding: 30px 0px;
    border-radius: 8px;
    background-color: rgb(29,29,31);
`;

const UploadFile = ({ projectId }: any) => {
    const allowedFileTypes = ['application/pdf']; // Corrected file type for PDF
    const [loading, setLoading] = useState(false);
    const { uploadFile, uploadAbstract, deleteFile } = useHttpClient();
    const [form] = useForm();

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Received values from form:', values);
        const formData = new FormData();
        const selectedFile = values.file.fileList[0]['originFileObj'];
        const selectedFilename = values.file.fileList[0]['name'];
        formData.append('file', selectedFile);
        uploadFile(formData)
            .then(res => {
                const assetUrl = res?.data?.fileUrl;
                form.resetFields();
                uploadAbstract(projectId, assetUrl)
                    .then(res => {
                        message.info('Project Uploaded successfully');
                    })
                    .catch(err => {
                        deleteFile(selectedFilename)
                            .then(res => {
                                message.info('Failed to upload project Deleted the uploaded file');
                            })
                            .catch(err => {
                                message.error('Failed to delete file');
                            })
                        console.log('Failed to upload Abstract');
                    })
                setLoading(false);
                message.info('File uploaded successfully');
            })
            .catch(err => {
                setLoading(false);
                message.error('Error uploading file');
            })
    };

    const props = {
        name: 'file',
        multiple: false,
        accept: allowedFileTypes.join(','),
        maxCount: 1,
        onChange(info: any) {
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
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        beforeUpload(file: any) {
            const extension = file.name.split('.').pop()?.toLowerCase();
            const isAllowedExtension = extension ? allowedFileTypes.includes(`application/${extension}`) : false; // Check if the file type is in the allowed file types

            if (!extension || !isAllowedExtension) {
                message.error(`Unsupported file type: ${file.name}`);
                return Upload.LIST_IGNORE;
            }

            const fileSizeMB = file.size / 1024 / 1024;
            const maxFileSizeMB = 10;

            if (fileSizeMB > maxFileSizeMB) {
                message.error(`File size exceeds the maximum limit of ${maxFileSizeMB}MB.`);
                return Upload.LIST_IGNORE;
            }
            return false;
        },
    };

    return (
        <StyledDiv>
            <Form form={form} onFinish={onFinish} layout='vertical'>
                <Form.Item
                    label={<span style={{ color: 'white' }}>Project File</span>}
                    name="file"
                >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text" style={{ color: 'white' }}>Click or Drag here to upload</p>
                        <p className="ant-upload-hint" style={{ color: 'white' }}>
                            Allowed file types .pdf
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={loading} ghost>
                        Upload
                    </Button>
                </Form.Item>
            </Form>
        </StyledDiv >
    );
};

export default UploadFile;
