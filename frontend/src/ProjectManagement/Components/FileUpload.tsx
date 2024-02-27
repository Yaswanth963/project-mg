import React, { useContext, useState } from 'react';
import { Button, Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import styled from '@emotion/styled';
import { useHttpClient } from '../hooks/useHttpClient';
import { Project } from '../utils';
import { AuthContext } from '../Context/authContext';
import moment from 'moment';

const StyledDiv = styled.div`
    margin: 10px;
`;

export const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [fileSize, setFileSize] = useState<number>(0);

    const { uploadFile, uploadProject, deleteFile } = useHttpClient();
    const { userData } = useContext(AuthContext);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setFileSize(file.size);
            setProjectName(file.name);
        }
    };

    const resetFields = () => {
        setSelectedFile(null);
        setProjectName('');
        setProjectDescription('');
        setFileSize(0);
        setUploading(false);
    }

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);

            uploadFile(formData)
                .then(res => {
                    const assetUrl = res?.data?.fileUrl;
                    const project: Project = {
                        projectName: projectName,
                        projectDescription: projectDescription,
                        userId: userData.userId,
                        projectAssetUrl: assetUrl,
                        projectAssetSize: Math.ceil(fileSize / 1024 / 1024),
                        dateOfSubmission: moment().format('DD-MM-YYYY'),
                        submittedBy: userData.username,
                    }
                    resetFields();
                    uploadProject(project)
                        .then(res => {
                            alert('Project Uploaded successfully');
                        })
                        .catch(err => {
                            deleteFile(projectName)
                                .then(res => {
                                    console.log('Deleted file from s3');
                                    alert('Failed to upload project Deleted the uploaded file');
                                })
                                .catch(err => {
                                    alert('Failed to delete file');
                                })
                            console.log('Failed to upload project');
                        })
                })
                .catch(err => {
                    alert('Upload failed');
                })

        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
    };

    const validateProjectDescription = (value: string) => {
        const words = value.trim().split(/\s+/);
        return words.length >= 20;
    };

    return (
        <div style={{ margin: '20px' }}>
            <StyledDiv>
                <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Project File
                </Typography>
                <Input
                    type="file"
                    accept=".mp4, .jpeg, .png, .jpg, .mov, .avi"
                    onChange={handleFileChange}
                />
            </StyledDiv>
            <StyledDiv>
                <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Project Name
                </Typography>
                <Input
                    type="text"
                    value={projectName}
                    disabled
                />
            </StyledDiv>
            <StyledDiv>
                <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Project Description
                </Typography>
                <TextArea
                    placeholder="Project Description (minimum 20 words)"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={8}
                    required
                />
            </StyledDiv>
            <Button onClick={handleUpload}
                disabled={!selectedFile || !projectName || !validateProjectDescription(projectDescription) || uploading}
                style={{ marginLeft: '10px' }}
                type='primary'
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </Button>
        </div>
    );
};
