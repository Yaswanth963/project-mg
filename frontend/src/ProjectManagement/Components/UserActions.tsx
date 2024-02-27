
import styled from '@emotion/styled'
import { ReactComponent as Delete } from '../assets/svgs/delete.svg'
import { ReactComponent as View } from '../assets/svgs/view.svg'
import { Project } from '../utils'

const StyledDiv = styled.div`
    display:flex;
`

interface UserActionProps {
    viewHandler: (project: Project) => void
    deleteHandler: (projectId: number | undefined) => void
    project: Project
}

export const UserActions = ({ viewHandler, deleteHandler, project }: UserActionProps) => {
    return (
        <StyledDiv>
            <View style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => {
                viewHandler(project);
                console.log('View Project')
            }} />
            <Delete style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => {
                deleteHandler(project?.projectId);
                console.log('Delete Project')
            }} />
        </StyledDiv>
    )
}