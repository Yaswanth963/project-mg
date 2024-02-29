export interface Project {
  projectId?: number;
  projectName: string;
  projectDescription: string;
  projectAssetUrl: string;
  projectAssetSize: number;
  dateOfSubmission: string;
  submittedBy: string;
  status?: string;
  userId: string;
  likes?: number;
  comments?: DataProps[];
}

export interface User {
  name: string;
  email: string;
  password: string;
  rollNo: string;
  role?: string;
}

export interface DataProps {
  userId: string;
  comId: string;
  avatarUrl: string;
  userProfile?: string;
  fullName: string;
  text: string;
  replies: any;
  commentId: string;
}

export enum ProjectStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum UserRole {
  REVIEWER = "REVIEWER",
  USER = "USER",
}

export const NETWORK_CALL_TIMEOUT = 5 * 60 * 1000;

export const BASE_URLS = {
  EXPRESS_URL: process.env.REACT_APP_EXPRESS_URL,
};