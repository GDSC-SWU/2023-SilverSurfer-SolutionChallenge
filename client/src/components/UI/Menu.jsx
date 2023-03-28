import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
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

export default function Menu() {
  const authState = useSelector((state) => state);
  const navigate = useNavigate();

  const onMypageClick = () => {
    let link = `/mypage`;
    if (!authState.accessToken) {
      link = `/login`;
    }

    navigate(link);
  };

  return (
    <NavWrapper>
      <MenuWrapper>
        <MenuContentBox to={"/"}>
          <MenuIcon src={icon_main} />
          <MenuText>메인</MenuText>
        </MenuContentBox>

        <MenuContentBox smooth to={"/#core"}>
          <MenuIcon src={icon_key} />
          <MenuText>핵심 지침</MenuText>
        </MenuContentBox>

        <MenuContentBox smooth to={"/#ux"}>
          <MenuIcon src={icon_ux} />
          <MenuText>UX 가이드</MenuText>
        </MenuContentBox>

        <MenuContentBox smooth to={"/#component"}>
          <MenuIcon src={icon_component} />
          <MenuText>컴포넌트</MenuText>
        </MenuContentBox>

        <MenuContentBox smooth to={"/#style"}>
          <MenuIcon src={icon_style} />
          <MenuText>스타일</MenuText>
        </MenuContentBox>

        <MenuContentBox smooth to={"/#contribute"}>
          <MenuIcon src={icon_communication} />
          <MenuText>의견 제출</MenuText>
        </MenuContentBox>

        <MenuContentBox>
          <MenuIcon src={icon_project} />
          <MenuText>프로젝트 소개</MenuText>
        </MenuContentBox>
      </MenuWrapper>

      <SubMenuWrapper>
        <MypageBox onClick={onMypageClick}>
          <SubMenuIcon src={icon_my} />
        </MypageBox>

        <SubMenuContentBox>
          <SubMenuIcon src={icon_search} />
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

const MenuContentBox = styled(HashLink)`
  width: 100%;
  height: 5.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
`;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const MypageBox = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SubMenuContentBox = styled(Link)`
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SubMenuIcon = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  display: block;
`;
