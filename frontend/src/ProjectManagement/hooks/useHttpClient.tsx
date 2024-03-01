import httpClient from "../httpClient";
import { BASE_URLS, DataProps, Project, User } from "../utils";
export const useHttpClient = () => {

    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem("token") || ""
        }
    }

    const headers = {
        headers: {
            'Authorization': localStorage.getItem("token") || ""
        }
    }

    return {
        fetchFileFromS3: (fileName: string) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/download/${fileName}`, headers)
        },
        fetchProjectsByUserId: (userId: string) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/projects/${userId}`, headers)
        },
        fetchProjects: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/projects`, headers)
        },
        fetchProjectById: (projectId: number | undefined) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/project/${projectId}`, headers)
        },
        acceptProject: (projectId: number | undefined) => {
            const body = {
                status: "APPROVED"
            }
            return httpClient.patch(`${BASE_URLS.EXPRESS_URL}/project/${projectId}`, body, headers)
        },
        rejectProject: (projectId: number | undefined) => {
            const body = {
                status: "REJECTED"
            }
            return httpClient.patch(`${BASE_URLS.EXPRESS_URL}/project/${projectId}`, body, headers)
        },
        uploadProject: (project: Project) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/project`, project, headers)
        },
        deleteProject: (projectId: number | undefined) => {
            return httpClient.delete(`${BASE_URLS.EXPRESS_URL}/project/${projectId}`, headers)
        },
        uploadFile: (file: FormData) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/file/upload`, file, options)
        },
        deleteFile: (fileName: string) => {
            return httpClient.delete(`${BASE_URLS.EXPRESS_URL}/file/delete/${fileName}`, headers)
        },
        login: (req: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/login`, req, headers);
        },
        signup: (req: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/user`, req, headers);
        },
        getUser: (userId: string) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/user/${userId}`, headers)
        },
        updateUser: (rollNo: string | undefined, req: any) => {
            return httpClient.patch(`${BASE_URLS.EXPRESS_URL}/user/${rollNo}`, req, headers)
        },
        likeProject: (projectId: number | undefined) => {
            return httpClient.patch(`${BASE_URLS.EXPRESS_URL}/project/${projectId}`, null, headers)
        },
        commentProject: (projectId: number | undefined, comment: DataProps[] | []) => {
            return httpClient.put(`${BASE_URLS.EXPRESS_URL}/project/comment/${projectId}`, comment, headers)
        }
    };
};
