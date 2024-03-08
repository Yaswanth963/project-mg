
import styled from '@emotion/styled'
import { Project } from '../../utils'

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
            <svg width="25" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => {
                    viewHandler(project);
                }}
            >
                <path d="M12.5 5C6.13636 5 2.5 12 2.5 12C2.5 12 6.13636 19 12.5 19C18.8636 19 22.5 12 22.5 12C22.5 12 18.8636 5 12.5 5Z" stroke="#777A83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12C9.5 13.6569 10.8431 15 12.5 15Z" stroke="#777A83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: 10, cursor: 'pointer' }} onClick={() => {
                    deleteHandler(project?.projectId);
                }}
            >
                <g clip-path="url(#clip0_5_19)">
                    <path d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM16.997 7H7.003L7.931 20H16.069L16.997 7ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z" fill="#777A83" />
                </g>
                <defs>
                    <clipPath id="clip0_5_19">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </StyledDiv>
    )
}