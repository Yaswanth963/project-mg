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
  comments?: string[];
}

export interface User {
  name: string;
  email: string;
  password: string;
  rollNo: string;
  role?: string;
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

export const textContent = `# Hello, World!

This is a sample text content. You can replace it with your own text.

- List item 1
- List item 2

**Bold text** *Italic text* [Link](https://example.com)

\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name + '!');
}
greet('World');
\`\`\`
`;
