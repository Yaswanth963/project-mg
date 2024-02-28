import styled from "@emotion/styled"
import { NavBar } from "./Navbar"
import { Typography, Image } from "antd";
import ProjectImage from '../assets/images/project1.png';

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    >*{
        padding:50px;
    }
`;

const styles = {
    fontSize: '60px', fontWeight: 'bold', lineHeight: '70px', color: '#FFFFFF'
};

export const Welcome = () => {
    return (
        <>
            <div style={{ backgroundColor: 'rgb(29,29,31)', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <StyledDiv>
                    <div>
                        <Typography style={styles}>
                            Turning Visions
                        </Typography >
                        <Typography style={styles}>
                            into Project
                        </Typography>
                        <Typography style={styles}>
                            Realities
                        </Typography>
                        <Typography.Paragraph style={{ fontSize: '20px', marginTop: '20px', color: '#FFFFFF' }}>
                            Empowering Efficient Collaboration; Crafting
                            projects that Drive Success and Elevate Business...
                        </Typography.Paragraph>
                        <p style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '8px 25px', display: 'inline' }}>Get started</p>
                    </div>
                    <div>
                        <Image
                            width={500}
                            height={500}
                            src={ProjectImage}
                            preview={false}
                        />
                    </div>
                </StyledDiv >
            </div>
        </>)
}