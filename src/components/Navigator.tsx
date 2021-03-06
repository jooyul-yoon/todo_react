import { Link } from "react-router-dom";
import styled from "styled-components";
import TableIcon from "../img/table.png";
import TaskIcon from "../img/task.png";
import todo from "../img/to-do.png";
import framer from "../img/motion.png";
import coins from "../img/coins.png";
import { ReactComponent as MoonIcon } from "../img/moon.svg";
import { ReactComponent as SunIcon } from "../img/sun.svg";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { useState } from "react";

const Header = styled.header`
  background-color: ${(props) => props.theme.navBgColor};
  box-shadow: 0px 2px 4px rgb(0 0 0 / 10%);
  font-family: "Google Sans", "Roboto", sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
  max-height: 80px;
  transition: 0.5s;
`;
const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;
const HomeIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10vw;
  img {
    max-height: 50px;
    margin-right: 10px;
  }
  span {
    font-size: 1.3rem;
    color: ${(props) => props.theme.blackColor};
    margin-right: 0;
  }
`;
const TabContainer = styled.div`
  display: flex;
  margin-right: 5vw;
  justify-content: center;
  align-items: center;
  a {
    color: ${(props) => props.theme.blackColor};
    font-size: 1rem;
    img {
      margin-left: 20px;
      height: 30px;
    }
  }
`;
const ToDoIcon = styled.div`
  img {
    cursor: pointer;
    margin-left: 20px;
    height: 30px;
  }
`;
const DropDown = styled.div<{ isShowing: Boolean }>`
  margin-top: 15px;
  position: absolute;
  display: ${(props) => (props.isShowing ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    padding: 3px 5px;
    :hover {
      background-color: ${(props) => props.theme.lightGrayColor};
      color: white;
    }
    img {
      margin: 6px 0;
      width: 20px;
      height: 20px;
    }
    span {
      text-align: center;
      padding: 10px 0px;
      font-size: 13px;
    }
  }
`;
const BtnContainer = styled.div`
  /* position: absolute;
  right: 0; */
  margin-left: 20px;
`;
const ThemeToggle = styled.button<{ isDark: boolean }>`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.25rem 0.4rem;
  position: relative;
  /* width: 4rem; */
  height: 30px;
  svg {
    height: auto;
    width: 1.1rem;
    transition: all 0.3s linear;
    // sun icon
    &:first-child {
      transform: ${(props) =>
        props.isDark ? "translateY(100px)" : `translateY(0px)`};
    }

    // moon icon
    &:last-child {
      transform: ${(props) =>
        !props.isDark ? "translateY(100px)" : `translateY(0px)`};
    }
  }
`;

function Navigator() {
  const [framerShow, setFramerShow] = useState(false);
  const [todoShow, setTodoShow] = useState(false);
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleTheme = () => setDarkAtom((prev: any) => !prev);
  const toggleTodoShow = () => {
    setFramerShow(false);
    setTodoShow(!todoShow);
  };
  const toggleFramerShow = () => {
    setTodoShow(false);
    setFramerShow(!framerShow);
  };
  const closeShow = () => {
    setTodoShow(false);
    setFramerShow(false);
  };
  localStorage.setItem("isDark", JSON.stringify(isDark));
  return (
    <Header>
      <NavContainer onMouseLeave={closeShow}>
        <HomeIconContainer>
          <Link to={"/react"}>
            <span>React Master Class</span>
            {/* <img src={todo} alt="react" /> */}
          </Link>
        </HomeIconContainer>
        <TabContainer>
          <Link to={"/react/crypto_tracker"}>
            <img src={coins} alt="coins" />
          </Link>
          <ToDoIcon>
            <img onClick={toggleTodoShow} src={todo} alt="todo" />
            <DropDown isShowing={todoShow}>
              <Link to={"/react/todo"}>
                <img src={TaskIcon} alt="task" />
              </Link>
              <Link to={"/react/trello"}>
                <img src={TableIcon} alt="trello" />
              </Link>
            </DropDown>
          </ToDoIcon>
          <ToDoIcon>
            <img onClick={toggleFramerShow} src={framer} alt="framer" />
            <DropDown isShowing={framerShow}>
              <Link to={"/react/animation/practice1"}>
                <span>Animations</span>
              </Link>
              <Link to={"/react/animation/practice2"}>
                <span>Layout</span>
              </Link>
            </DropDown>
          </ToDoIcon>
          <BtnContainer>
            <ThemeToggle isDark={isDark} onClick={toggleTheme}>
              <SunIcon />
              <MoonIcon />
            </ThemeToggle>
          </BtnContainer>
        </TabContainer>
      </NavContainer>
    </Header>
  );
}
export default Navigator;
