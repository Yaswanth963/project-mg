import { Avatar, Badge, Image, Typography } from 'antd';
import { ReactComponent as Like } from '../assets/svgs/like.svg'
import { ReactComponent as Comment } from '../assets/svgs/comment.svg'
import { DataProps, Project } from '../utils';
import { Comments } from './Comments';
import '../styles/styles.css'
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHttpClient } from '../hooks/useHttpClient';

interface ProjectProps {
    projectId?: number,
    project?: Project,
    like: boolean,
    likeHandler: () => void
    commentHandler: (data: DataProps[]) => void
}

const CommentsContainer = styled.div`
    overflow-y: auto;
`

export const ProjectView = ({ projectId, likeHandler, like, commentHandler }: ProjectProps) => {

    const [showComments, setShowComments] = useState(false);
    const [tempProject, setTempProject] = useState<Project>();
    const { fetchProjectById, downloadFile } = useHttpClient();

    useEffect(() => {
        fetchProjectById(projectId)
            .then(res => {
                setTempProject(res?.data);
            })
            .catch(err => {
                console.log("Error fetching project");
            })
    }, [projectId])

    const handleLike = () => {
        likeHandler();
    }

    const getFileExtension = (filename: string | undefined) => {
        return filename?.split('.').pop()?.toLowerCase();
    };

    const fileExtension = getFileExtension(tempProject?.projectAssetUrl);

    const renderMedia = () => {
        if (!fileExtension) return null;

        if (fileExtension === 'mp4' || fileExtension === 'mov' || fileExtension === 'avi') {
            return (
                <video
                    width="600"
                    height="300"
                    controls
                    style={{ borderRadius: '5px' }}
                >
                    <source src={tempProject?.projectAssetUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
            return (
                <Image src={tempProject?.projectAssetUrl} height={200} width={200} style={{ borderRadius: '8px' }} />
            );
        } else {
            return null;
        }
    };

    return (
        <div className='inner'
            style={{
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%'
            }}>
            <div style={{
                width: '90%', borderRadius: '5px solid white', display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <div style={{ padding: '30px 0px' }}>
                    <Typography.Title style={{ color: '#FFFFFF' }}>
                        {tempProject?.projectName}
                    </Typography.Title>
                    <a href={tempProject?.abstractUrl}>
                        Download Abstract File
                    </a>
                    <Typography.Paragraph style={{ color: 'rgb(183,183,184)', maxWidth: '600px' }}>
                        {tempProject?.projectDescription}
                    </Typography.Paragraph>
                </div>
                <div style={{ padding: '20px' }}>
                    {renderMedia()}
                </div>
                <Typography.Title style={{ color: '#FFFFFF', fontSize: '23px' }}>
                    Hope you like my project
                </Typography.Title>
                <Typography.Paragraph style={{ color: '#FFFFFF' }}>
                    Would like to hear in your words. Comment below...
                </Typography.Paragraph >
                <div style={{ width: '120px', display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
                    <Badge count={!like ? tempProject?.likes : (tempProject?.likes || 0) + 1} color='#0080F0'>
                        <Avatar shape="square" size="large" icon={<Like />} onClick={handleLike} />
                    </Badge>
                    <Badge count={tempProject?.comments?.length} color='#0080F0'>
                        <Avatar shape="square" size="large" icon={<Comment onClick={() => setShowComments(!showComments)} />} />
                    </Badge>
                </div>
            </div>
            <CommentsContainer>
                {showComments && <Comments commentHandler={commentHandler} projectId={tempProject?.projectId} />}
            </CommentsContainer>
        </div >
    );
};

