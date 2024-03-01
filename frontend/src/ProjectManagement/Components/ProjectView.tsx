import { Avatar, Badge, Image, Typography } from 'antd';
import { ReactComponent as Like } from '../assets/svgs/like.svg'
import { ReactComponent as Comment } from '../assets/svgs/comment.svg'
import { DataProps, Project } from '../utils';
import { Comments } from './Comments';
import '../styles/styles.css'
import { useState } from 'react';

interface ProjectProps {
    project?: Project,
    like: boolean,
    comments: DataProps[] | [],
    likeHandler: () => void
    commentHandler: (data: DataProps[]) => void
}


export const ProjectView = ({ project, likeHandler, like, comments, commentHandler }: ProjectProps) => {

    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        likeHandler();
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
                        {project?.projectName}
                    </Typography.Title>
                    <Typography.Paragraph style={{ color: 'rgb(183,183,184)', maxWidth: '600px' }}>
                        {project?.projectDescription}
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
                    <Badge count={like ? project?.likes : (project?.likes || 0) + 1} color='#0080F0'>
                        <Avatar shape="square" size="large" icon={<Like />} onClick={handleLike} />
                    </Badge>
                    <Badge count={99} overflowCount={10} color='#0080F0'>
                        <Avatar shape="square" size="large" icon={<Comment onClick={() => setShowComments(!showComments)} />} />
                    </Badge>
                </div>
            </div>
            {showComments && <Comments commentHandler={commentHandler} comments={comments} projectId={project?.projectId} />}
        </div >
    );
};

