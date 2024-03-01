import React, { useContext, useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import type { TableProps } from 'antd';
import { DataProps, Project, ProjectStatus } from '../utils';
import moment from 'moment';
import styled from '@emotion/styled';
import { UserActions } from './Actions/UserActions';
import { useHttpClient } from '../hooks/useHttpClient';
import { ProjectView } from './ProjectView';
import { AuthContext } from '../Context/authContext';
import { UserNavbar } from './UserNavbar';
import '../styles/styles.css'
import { useNavigate } from 'react-router-dom';
const capitalize = require('capitalize');

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
    const [projects, setprojects] = useState<Project[] | []>();
    const [activeProject, setActiveProject] = useState<Project>();
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();
    const { likeProject, commentProject, fetchProjectsByUserId, deleteProject } = useHttpClient();

    const deleteHandler = (projectId: number | undefined) => {
        deleteProject(projectId)
            .then(res => {
                setReload(!reload);
                alert(`Project ${projectId} deleted successfully`)
            })
            .catch(err => {
                console.log('Failed to delete project')
            })
    }

    const viewHandler = (project: Project) => {
        setView(true);
        setActiveProject(project);
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

    const likeHandler = () => {
        setLike(!like)
    }

    const columns: TableProps<Project>['columns'] = [
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: ProjectStatus) => (
                <span
                    style={{
                        backgroundColor:
                            status === ProjectStatus.PENDING ? 'rgb(231,111,58)' :
                                status === ProjectStatus.APPROVED ? 'rgb(59,104,233)' :
                                    '#D62828'
                        , borderRadius: '8px',
                        color: '#FFFFFF',
                        padding: '4px 8px',
                        width: '75px',
                        fontWeight: 'bold'
                    }}
                >
                    {capitalize(status)}
                </span >
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, project: Project) => {
                return <UserActions deleteHandler={(projectId) => deleteHandler(projectId)} viewHandler={viewHandler} project={project} />
            }
        },
    ];


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

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        const userId = userData.userId;
        fetchProjectsByUserId(userId)
            .then(res => {
                const projects = res?.data;
                setprojects(projects);
            })
            .catch(err => {
                console.log('Error Fetching Projects');
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
                width='80vw'
                style={{ maxHeight: '80vh', color: '#FFFFFF' }}
            >
                <ProjectView
                    projectId={activeProject?.projectId}
                    commentHandler={(comment: DataProps[]) => commentHandler(comment)}
                    like={like}
                    likeHandler={likeHandler} />
            </Modal>
        </StyledTable>
    )
}

export default Reviewer;
