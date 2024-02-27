import React, { useContext, useEffect, useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Project, ProjectStatus } from '../utils';
import moment from 'moment';
import styled from '@emotion/styled';
import { UserActions } from './UserActions';
import { useHttpClient } from '../hooks/useHttpClient';
import { ProjectView } from './ProjectView';
import { AuthContext } from '../Context/authContext';
import { UserNavbar } from './UserNavbar';
import '../styles/styles.css'

const StyledTable = styled.div`
    background-color: rgb(48,45,61);
    height: 100vh;
`

const Reviewer: React.FC = () => {
    const [reload, setReload] = useState(false);
    const [view, setView] = useState(false);
    const [projects, setprojects] = useState<Project[] | []>();
    const [activeProject, setActiveProject] = useState<Project>();
    const { fetchProjectsByUserId, deleteProject } = useHttpClient();
    const { userData } = useContext(AuthContext);

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
            render: (date: Date) => moment(date).format('YYYY-MM-DD'),
            ellipsis: true
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: ProjectStatus) => (
                <Tag color={status === ProjectStatus.PENDING ? 'orange' : status === ProjectStatus.APPROVED ? 'green' : 'red'}>
                    {status}
                </Tag>
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


    useEffect(() => {
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

    const handleCancel = () => {
        setView(false);
    }

    return (
        <StyledTable>
            <UserNavbar />
            <Table columns={columns}
                dataSource={projects}
                pagination={false}
                style={{ padding: '40px' }}
                rowClassName='row-style'
            />
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
        </StyledTable>
    )
}

export default Reviewer;
