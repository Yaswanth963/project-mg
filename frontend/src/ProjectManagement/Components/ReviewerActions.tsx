
import styled from '@emotion/styled'
import { ReactComponent as View } from '../assets/svgs/view.svg'
import { ReactComponent as Approve } from '../assets/svgs/approve.svg'
import { ReactComponent as Reject } from '../assets/svgs/reject.svg'
import { Project } from '../utils'

const StyledDiv = styled.div`
    display:flex;
`

interface ReviewerActionProps {
    project: Project
    viewhandler: (project: Project) => void
    acceptHandler: (projectId: number | undefined) => void
    rejectHandler: (projectId: number | undefined) => void
}

export const ReviewerActions = ({ project, acceptHandler, rejectHandler, viewhandler }: ReviewerActionProps) => {
    return (
        <StyledDiv>
            <View style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => {
                console.log('View Project')
                viewhandler(project);
            }} />
            <Approve style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => {
                console.log('Approve Project')
                acceptHandler(project.projectId);
            }} />
            <Reject style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => {
                console.log('Reject Project')
                rejectHandler(project.projectId);
            }} />
        </StyledDiv>
    )
}