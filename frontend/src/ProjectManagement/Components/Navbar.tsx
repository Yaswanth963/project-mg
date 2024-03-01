import styled from "@emotion/styled";
import { ReactComponent as ProjectIcon } from '../assets/svgs/project-logo.svg';
import { Link, useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    >*{
        padding:50px;
    }
`;

const LinksContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
`;

const LinkItem = styled(Link)`
    margin-right: 30px;
    color: #FFFFFF;
    text-decoration: none;
    &:last-child {
        margin-right: 0;
    }
`;

const LoginButton = styled.div`
    background-color: #FFFFFF;
    color: #000000;
    padding: 5px 20px;
    border-radius: 20px;
    cursor: pointer;
`;

export const NavBar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("userRole");
    return (
        <StyledDiv>
            <ProjectIcon style={{ padding: '10px 30px', cursor: 'pointer' }} onClick={() => { navigate("/") }} />
            <LinksContainer>
                <LinkItem to="/home">Home</LinkItem>
                <LinkItem to={role == 'REVIEWER' ? "/reviewer" : "user"}>Explore</LinkItem>
                <LinkItem to="/about">About us</LinkItem>
                <LoginButton onClick={() => { navigate("/login") }}>Login</LoginButton>
            </LinksContainer>
        </StyledDiv>
    );
};
