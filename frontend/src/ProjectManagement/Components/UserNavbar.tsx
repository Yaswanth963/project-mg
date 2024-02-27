import styled from "@emotion/styled";
import { ReactComponent as ProfileIcon } from '../assets/svgs/profile.svg';
import ProjectIcon from '../assets/images/project-logo.png';
import { ReactComponent as Upload } from '../assets/svgs/upload.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Image, MenuProps, Modal, Typography } from "antd";
import { FileUpload } from "./FileUpload";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    background-color: rgb(48,45,61); 
    border-bottom: 1px solid white; 
`;

export const UserNavbar = () => {
    const [showUpload, setshowUpload] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to="/profile">Profile</Link>,
        },
        {
            key: '2',
            label: (
                <a
                    href="/"
                    onClick={() => {
                        localStorage.clear();
                    }}
                >
                    Logout
                </a>
            ),
        }]
    return (
        <StyledDiv>
            {/* <ProjectIcon style={{ padding: '10 0 10 30', cursor: 'pointer' }} onClick={() => { navigate("/") }} /> */}
            <div style={{color:'#FFFFFF'}}>
                <Image src={ProjectIcon} width={70} height={70} preview={false}/>
                Project Hub
            </div>
            <div>
                {<Upload style={{ padding: '10 30 10 0', cursor: 'pointer' }} onClick={() => {
                    setshowUpload(true);
                }} />}
                <Dropdown menu={{ items }}>
                    <ProfileIcon style={{ padding: '10 30 10 0', cursor: 'pointer' }} />
                </Dropdown>
            </div>
            <Modal
                open={showUpload}
                title=""
                footer={false}
                onCancel={() => {
                    setshowUpload(false);
                }}
                width={800}
            >
                <FileUpload />
            </Modal>
        </StyledDiv>
    );
};
