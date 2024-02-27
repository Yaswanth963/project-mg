import { Avatar, Badge, Image, Typography } from 'antd';
import { ReactComponent as Like } from '../assets/svgs/like.svg'
import { ReactComponent as Comment } from '../assets/svgs/comment.svg'
import { Project } from '../utils';

import '../styles/styles.css'
import { useHttpClient } from '../hooks/useHttpClient';
import { useState } from 'react';

interface ProjectProps {
    project?: Project
}


export const ProjectView = ({ project }: ProjectProps) => {

    const [likes, setLikes] = useState<number | undefined>();
    const [showComments, setShowComments] = useState(false);
    const { likeProject } = useHttpClient();

    const handleLike = () => {
        likeProject(project?.projectId)
            .then(res => {
                console.log('Liked the project');

            })
            .catch(err => {
                console.log('Liked the project');
            })
    }

    const getFileExtension = (filename: string | undefined) => {
        return filename?.split('.').pop()?.toLowerCase();
    };

    const fileExtension = getFileExtension(project?.projectAssetUrl);

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
                    <source src={project?.projectAssetUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
            return (
                <Image src={project?.projectAssetUrl} height={200} width={200} style={{ borderRadius: '8px' }} />
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <div className='inner' style={{
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <div style={{ padding: '30px 0px' }}>
                    <Typography.Title>
                        {project?.projectName}
                    </Typography.Title>
                    <Typography.Paragraph style={{ color: 'grey', maxWidth: '600px' }}>
                        {project?.projectDescription}
                    </Typography.Paragraph>
                </div>
                <div style={{ padding: '20px' }}>
                    {renderMedia()}
                </div>
                <Typography.Title>
                    Hope you like my project
                </Typography.Title>
                <Typography.Paragraph>
                    Would like to hear in your words. Comment below...
                </Typography.Paragraph>
                <div style={{ width: '120px', display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
                    <Badge count={project?.likes} color='#0080F0'>
                        <Avatar shape="square" size="large" icon={<Like />} onClick={handleLike} />
                    </Badge>
                    <Badge count={99} overflowCount={10} color='#0080F0'>
                        <Avatar shape="square" size="large" icon={<Comment onClick={() => setShowComments(!showComments)} />} />
                    </Badge>
                </div>
            </div >
        </>
    );
};

