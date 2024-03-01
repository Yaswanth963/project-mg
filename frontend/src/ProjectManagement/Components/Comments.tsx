import { CommentSection } from "react-comments-section"
import 'react-comments-section/dist/index.css'
import Image from '../assets/images/project-2.png'
import { BASE_URLS, DataProps, Project } from "../utils"
import { AuthContext } from "../Context/authContext"
import { useContext, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useHttpClient } from "../hooks/useHttpClient"
import { useRef } from 'react';


interface commentDataProps {
    projectId?: number
    comments: any,
    commentHandler: (data: DataProps[]) => void,
}


const CommentsContainer = styled.div`
    height: 100%;
    overflow-y: auto;
`

export const Comments = ({ projectId, comments, commentHandler }: commentDataProps) => {
    const loginLink = `${BASE_URLS.EXPRESS_URL}/login`
    const signupLink = `${BASE_URLS.EXPRESS_URL}/signup`
    const { userData } = useContext(AuthContext);
    const { fetchProjectById } = useHttpClient();
    const [project, setProject] = useState<Project>();
    const [commentsTemp, setCommentsTemp] = useState<DataProps[]>([]);
    const { commentProject } = useHttpClient();
    const initialCommentsTempRef = useRef(commentsTemp);


    useEffect(() => {
        initialCommentsTempRef.current = commentsTemp;
    }, [commentsTemp, projectId]);

    useEffect(() => {
        fetchProjectById(projectId)
            .then(res => {
                const project = res?.data;
                setProject(project);
                setCommentsTemp(project?.comments);
            })
            .catch(err => {
                console.log("Error getting project");
            });

        return () => {
            commentProject(projectId, initialCommentsTempRef.current)
                .then(res => {
                    console.log('Update coments');
                })
                .catch(err => {
                    console.log('Updating comments failed')
                });
        };
    }, [projectId]);


    return (
        < CommentSection
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
            commentData={commentsTemp}
        onSubmitAction={(data: DataProps) => {
                commentsTemp?.push(data);
            }
            }
            onReplyAction={(data: any) => {
                const commentIndex = commentsTemp?.findIndex(
                    (comment) => comment.comId === data.repliedToCommentId
                );
                if (commentIndex && commentIndex != -1) {
                    commentsTemp[commentIndex].replies.push(data);
                }
            }}

            onDeleteAction={(data: any) => {
                const { comIdToDelete, parentOfDeleteId } = data;

                if (parentOfDeleteId === undefined) {
                    const updatedComments = commentsTemp.filter(comment => comment.comId !== comIdToDelete);
                    setCommentsTemp(updatedComments);
                } else {
                    const updatedComments = [...commentsTemp];
                    const parentCommentIndex = updatedComments.findIndex(comment => comment.comId === parentOfDeleteId);

                    if (parentCommentIndex !== -1) {
                        const parentComment = updatedComments[parentCommentIndex];
                        const replyIndexToDelete = parentComment.replies.findIndex((reply: { comId: any }) => reply.comId === comIdToDelete);
                        if (replyIndexToDelete !== -1) {
                            parentComment.replies.splice(replyIndexToDelete, 1);
                            setCommentsTemp(updatedComments);
                        } else {
                            console.warn(`Reply with comId ${comIdToDelete} not found in replies array.`);
                        }
                    }
                }
            }}

    />
    )
}