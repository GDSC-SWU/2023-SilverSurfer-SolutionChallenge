import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";
import icon_main from "../../assets/icon/icon_menu_main.svg";
import icon_key from "../../assets/icon/icon_menu_target.svg";
import icon_project from "../../assets/icon/icon_menu_project.svg";
import icon_ux from "../../assets/icon/icon_menu_uxguideline.svg";
import icon_component from "../../assets/icon/icon_menu_component.svg";
import icon_style from "../../assets/icon/icon_menu_style.svg";
import icon_communication from "../../assets/icon/icon_menu_communication.svg";
import icon_my from "../../assets/icon/icon_menu_my.svg";
import icon_search from "../../assets/icon/icon_menu_search.svg";

export default function Menu({ onMouseEnter, onMouseLeave, onSearchClick }) {
  const authState = useSelector((state) => state);
  const [profile, setProfile] = useState(icon_my);
  const profileImagePath = authState.profileImage;
  const navigate = useNavigate();

  const onMainClick = () => {
    window.location.replace("/");
  };

  const onMypageClick = () => {
    let link = `/mypage`;
    if (!authState.accessToken) {
      link = `/login`;
    }

    navigate(link);
  };

  useEffect(() => {
    if (profileImagePath) {
      setProfile(profileImagePath);
    }
  });

  return (
    <NavWrapper>
      <MenuWrapper>
        <MenuContentBox onClick={onMainClick}>
          <HoverBox>
            <MenuIcon src={icon_main} />
            <MenuText>메인</MenuText>
          </HoverBox>
        </MenuContentBox>

        <MenuContentLink smooth to={"/#core"}>
          <HoverBox>
            <MenuIcon src={icon_key} />
            <MenuText>핵심 지침</MenuText>
          </HoverBox>
        </MenuContentLink>

        <MenuContentLink
          smooth
          to={"/#ux"}
          onMouseEnter={() => onMouseEnter("ux")}
          onMouseLeave={onMouseLeave}
        >
          <HoverBox>
            <MenuIcon src={icon_ux} />
            <MenuText>UX 가이드</MenuText>
          </HoverBox>
        </MenuContentLink>

        <MenuContentLink
          smooth
          to={"/#component"}
          onMouseEnter={() => onMouseEnter("component")}
          onMouseLeave={onMouseLeave}
        >
          <HoverBox>
            <MenuIcon src={icon_component} />
            <MenuText>컴포넌트</MenuText>
          </HoverBox>
        </MenuContentLink>

        <MenuContentLink
          smooth
          to={"/#style"}
          onMouseEnter={() => onMouseEnter("style")}
          onMouseLeave={onMouseLeave}
        >
          <HoverBox>
            <MenuIcon src={icon_style} />
            <MenuText>스타일</MenuText>
          </HoverBox>
        </MenuContentLink>

        <MenuContentLink smooth to={"/#contribute"}>
          <HoverBox>
            <MenuIcon src={icon_communication} />
            <MenuText>의견 제출</MenuText>
          </HoverBox>
        </MenuContentLink>

        <MenuContentBox>
          <HoverBox>
            <MenuIcon src={icon_project} />
            <MenuText>프로젝트 소개</MenuText>
          </HoverBox>
        </MenuContentBox>
      </MenuWrapper>

      <SubMenuWrapper>
        <SubMenuContentBox onClick={onMypageClick}>
          <HoverBox type={"sub"}>
            <SubMenuIcon isProfile={profileImagePath} src={profile} />
          </HoverBox>
        </SubMenuContentBox>

        <SubMenuContentBox onClick={onSearchClick}>
          <HoverBox type={"sub"}>
            <SubMenuIcon src={icon_search} />
          </HoverBox>
        </SubMenuContentBox>
      </SubMenuWrapper>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const MenuContentLink = styled(HashLink)`
  height: 5.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`;

const MenuContentBox = styled.div`
  height: 5.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`;

const HoverBox = styled.div`
  height: ${(props) => (props.type === "sub" ? "3.75rem" : "5.4rem")};
  width: ${(props) => (props.type === "sub" ? "3.75rem" : "100%")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.type === "sub" ? "50%" : "20px")};
  &:hover {
    background: rgba(25, 181, 216, 0.2);
  }
`;

const MenuIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  display: block;
`;

const MenuText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text_gray1};
  display: block;
  margin: 0.5rem 0 0 0;
  word-break: keep-all;
`;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const SubMenuContentBox = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// const SubMenuContentLink = styled(Link)`
//   width: 5rem;
//   height: 5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// `;

const SubMenuIcon = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  display: block;
  border-radius: 50%;
  border: ${(props) => props.isProfile && "1px solid #94a3a7"};
`;
