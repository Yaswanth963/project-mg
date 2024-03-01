import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import type { TableProps } from 'antd';
import { DataProps, Project, ProjectStatus } from '../utils';
import moment from 'moment';
import styled from '@emotion/styled';
import { ReviewerActions } from './Actions/ReviewerActions';
import { useHttpClient } from '../hooks/useHttpClient';
import { ProjectView } from './ProjectView';
import { UserNavbar } from './UserNavbar';
import '../styles/styles.css'

const StyledTable = styled.div`
    background-color: rgb(8,9,12);
    height: 100vh;
`
const ContentWrapper = styled.div`
    padding: 40px; 
`

const Reviewer: React.FC = () => {
    const [reload, setReload] = useState(false);
    const [like, setLike] = useState(false);
    const [view, setView] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProject, setActiveProject] = useState<Project>();
    const { fetchProjects, likeProject, commentProject, acceptProject, rejectProject } = useHttpClient();

    const acceptHandler = (projectId: number | undefined) => {
        acceptProject(projectId)
            .then(res => {
                setReload(!reload);
                alert(`Project ${projectId} accepted successfully`);
            })
            .catch(err => {
                console.log('Failed to accept the project', projectId);
            })
    }

    const likeHandler = () => {
        setLike(!like)
    }

    const commentHandler = (comment: DataProps[]) => {
        if (comment.length == 0 || Object.keys(comment[0]).length === 0)
            return;
        commentProject(activeProject?.projectId, comment)
            .then(res => {
                console.log('Commented Successfully');
            })
            .catch(err => {
                console.log('Commented Failed');
            })
    }

    const rejectHandler = (projectId: number | undefined) => {
        rejectProject(projectId)
            .then(res => {
                setReload(!reload);
                alert(`Project ${projectId} rejected successfully`);
            })
            .catch(err => {
                console.log('Failed to reject the project', projectId);
            })
    }

    const handleCancel = () => {
        if (like) {
            likeProject(activeProject?.projectId)
                .then(res => {
                    console.log('Liked the project');
                })
                .catch(err => {
                    console.log('Liked the project');
                })
        }
        setView(false);
    }

    const viewhandler = (project: Project) => {
        setActiveProject(project);
        setView(true);
    }

    const columns: TableProps<Project>['columns'] = [
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            ellipsis: true,
        },
        {
            title: 'Submitted By',
            dataIndex: 'submittedBy',
            key: 'submittedBy',
            ellipsis: true
        },
        {
            title: 'Date Of Submission',
            dataIndex: 'dateOfSubmission',
            key: 'dateOfSubmission',
            render: (date: Date) => moment(date).format('DD MMM YYYY'),
            ellipsis: true
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, project: Project) => {
                return <ReviewerActions
                    project={project}
                    acceptHandler={(projectId) => acceptHandler(projectId)}
                    rejectHandler={(projectId) => rejectHandler(projectId)}
                    viewhandler={(project) => viewhandler(project)}
                />
            }
        },
    ];

    useEffect(() => {
        fetchProjects()
            .then(res => {
                let projects: Project[] = res?.data;
                projects = projects.filter((project, _) => {
                    return project.status === ProjectStatus.PENDING;
                })
                setProjects(projects);
            })
            .catch(err => {
                console.log('Error fetching projects', err);
            })

    }, [reload])


    return (
        <StyledTable>
            <ContentWrapper>
                <UserNavbar />
                <Table columns={columns}
                    dataSource={projects}
                    pagination={false}
                    style={{ paddingTop: '40px' }}
                    rowClassName='row-style'
                />
            </ContentWrapper>
            <Modal
                title=""
                open={view}
                onCancel={handleCancel}
                footer={false}
                width={800}
                style={{ maxHeight: '80vh' }}
            >
                <ProjectView
                    projectId={activeProject?.projectId}
                    commentHandler={commentHandler}
                    like={like}
                    likeHandler={likeHandler}
                />
            </Modal>
        </StyledTable>
    )
}

export default Reviewer;
