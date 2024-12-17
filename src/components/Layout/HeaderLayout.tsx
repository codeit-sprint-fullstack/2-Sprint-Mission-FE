import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import LinkButton from "../UI/LinkButton";
import defaultProfileImage from "../../assets/images/ui/ic_profile.svg";
import { ReactComponent as Logo } from "../../assets/images/logo/logo.svg";
import { ReactComponent as TextLogo } from "../../assets/images/logo/text_logo.svg";

const fullWidthStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 14px 24px;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
`;

const HeaderLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLogo = styled(Logo)``;

const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #4b5563;
  gap: 47px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-right: 36px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    gap: 16px;
    font-size: 18px;

    ${StyledLogo} {
      display: none;
    }
  }
`;

const HeaderNavLink = styled(NavLink)`
  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

const LoginLink = styled(LinkButton)`
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  padding: 11px 23px;
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const Nickname = styled.span`
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    display: none;
  }
`;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fullWidthStyle}
  background-color: #ffffff;
  border-bottom: 1px solid #dfdfdf;
`;

const Main = styled.main`
  ${fullWidthStyle}
`;

interface UserProps {
  image?: string;
  nickname: string;
}

const Header: React.FC = () => {
  const { user } = useAuth() as { user: UserProps | null };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderNav>
          <HeaderMenu>
            <li>
              <HeaderLogoLink to="/" aria-label="홈으로 이동">
                <StyledLogo />
                <TextLogo />
              </HeaderLogoLink>
            </li>
            <li>
              <HeaderNavLink to="/community">
                자유게시판
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink to="/items">
                중고마켓
              </HeaderNavLink>
            </li>
          </HeaderMenu>
        </HeaderNav>

        {user ? (
          <ProfileLink to="/my" aria-label="마이페이지로 이동">
            <ProfileImage
              src={user.image ?? defaultProfileImage}
              alt={`${user.nickname} 프로필 이미지`}
            />
            <Nickname>{user.nickname}</Nickname>
          </ProfileLink>
        ) : (
          <LoginLink to="/login">로그인</LoginLink>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderLayout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default HeaderLayout;
