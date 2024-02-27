import React, { useEffect, useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Project, ProjectStatus } from '../utils';
import moment from 'moment';
import styled from '@emotion/styled';
import { ReviewerActions } from './ReviewerActions';
import { useHttpClient } from '../hooks/useHttpClient';
import { ProjectView } from './ProjectView';
import { UserNavbar } from './UserNavbar';

const StyledTable = styled.div`
`

const Reviewer: React.FC = () => {
    const [reload, setReload] = useState(false);
    const [view, setView] = useState(false);
    const [projects, setProjects] = useState();
    const [activeProject, setActiveProject] = useState<Project>();
    const { fetchProjects, acceptProject, rejectProject } = useHttpClient();

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
            ellipsis: true
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
                const projects = res?.data;
                setProjects(projects);
            })
            .catch(err => {
                console.log('Error fetching projects', err);
            })

    }, [reload])


    return (
        <StyledTable>
            <UserNavbar />
            <Table columns={columns} dataSource={projects} pagination={false} style={{ border: '0.5px solid grey' }} />
            <Modal
                title="click x to close the project"
                open={view}
                onCancel={handleCancel}
                footer={false}
                width={800}
                style={{ maxHeight: '80vh' }}
            >
                <ProjectView project={activeProject} />
            </Modal>
        </StyledTable>
    )
}

export default Reviewer;
