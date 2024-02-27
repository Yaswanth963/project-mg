import projectImage from '../assets/images/project-2.png'
import like from '../assets/svgs/like-1.svg'
import comment from '../assets/svgs/comment-1.svg'
import { Row, Col, Card, Typography, Modal, Image } from 'antd';
import { useHttpClient } from '../hooks/useHttpClient';
import { useEffect, useState } from 'react';
import { Project } from '../utils';
import { ProjectView } from './ProjectView';
import { ReactComponent as Clock } from '../assets/svgs/clock.svg';
import { ReactComponent as Approve } from '../assets/svgs/approve-1.svg'
const { Meta } = Card;

const HomePage: React.FC = () => {
    const [view, setView] = useState(false);
    const [projects, setProjects] = useState<Project[]>();
    const [activeProject, setActiveProject] = useState<Project>();
    const { fetchProjects } = useHttpClient();

    const handleCancel = () => {
        setView(false);
    }

    const handleActiveProject = (project: Project) => {
        setActiveProject(project);
        setView(true);
    }

    useEffect(() => {
        fetchProjects()
            .then(res => {
                const projects = res?.data;
                setProjects(projects);
            })
            .catch(err => {

            })
    }, [])

    return (
        <div style={{ backgroundColor: 'rgb(48,45,61)', height: '100vh' }}>
            <div style={{ overflowX: 'hidden',padding:'45px' }}>
                <Row gutter={[16, 16]}>
                    {projects?.map((project: Project, index) => (
                        <Col span={6} xs={20} sm={12} md={8} lg={5} xl={6} onClick={() => setActiveProject(project)}>
                            <Card
                                hoverable
                                title={<span style={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.projectName}</span>}
                                onClick={() => handleActiveProject(project)}
                                style={{ backgroundColor: 'rgb(66,68,83)', border: '0.1px solid white' }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between', color: '#FFFFFF', borderRadius: '8px',
                                    padding: '3px 5px',
                                    fontSize: '11px'

                                }}
                                >
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <Approve />&nbsp;
                                        Approved
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <Clock />&nbsp;
                                        {project.dateOfSubmission}
                                    </span>
                                </div>
                                <Meta
                                    title={``}
                                    description={<span style={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.projectDescription}</span>}
                                    style={{
                                        overflow: 'hidden', textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        marginTop: '10px'
                                    }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <Image src={projectImage} width={30} height={30} preview={false} style={{ borderRadius: '20px' }} />
                                    <div style={{ display: 'flex' }}>
                                        <Typography style={{ marginRight: '10px', color: 'white' }}>
                                            <Image src={like} width={30} height={30} preview={false} />
                                            &nbsp;&nbsp;
                                            {project.likes}
                                        </Typography>
                                        <Typography style={{ color: 'white' }}>
                                            <Image src={comment} width={30} height={30} preview={false} />
                                            &nbsp;&nbsp;
                                            {project.comments?.length}
                                        </Typography>
                                    </div>
                                </div>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <Modal
                title="click x to close the project"
                open={view}
                onCancel={handleCancel}
                footer={false}
                width={1000}
                style={{ maxHeight: '80vh' }}
            >
                <ProjectView project={activeProject} />
            </Modal>
        </div>
    )
};

export default HomePage;
