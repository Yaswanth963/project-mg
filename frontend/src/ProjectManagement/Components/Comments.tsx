import { CommentSection } from "react-comments-section"
import 'react-comments-section/dist/index.css'
import Image from '../assets/images/project-2.png'
import { BASE_URLS } from "../utils"
import { AuthContext } from "../Context/authContext"
import { useContext } from "react"

interface commentDataProps {
    comments?: any
}

interface DataProps {
    userId: string
    comId: string
    avatarUrl: string
    userProfile?: string
    fullName: string
    text: string
    replies: any
    commentId: string
}

export const Comments = ({ comments }: commentDataProps) => {
    const loginLink = `${BASE_URLS.EXPRESS_URL}/login`
    const signupLink = `${BASE_URLS.EXPRESS_URL}/signup`
    const { userData } = useContext(AuthContext);
    return <CommentSection
        currentUser={{
            currentUserFullName: userData.username,
            currentUserId: userData.userId,
            currentUserImg: Image,
            currentUserProfile: ''
        }}
        logIn={{
            loginLink: loginLink,
            signupLink: signupLink
        }}
        commentData={[]}
        onSubmitAction={(data: DataProps) => {
            console.log('check submit, ', data, 'index');
        }
        }
        currentData={(data: any) => {
            console.log('curent data', data)
        }}
    />
}