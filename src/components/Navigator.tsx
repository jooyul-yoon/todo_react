import { Link } from "react-router-dom";
import styled from "styled-components";
import TableIcon from "../img/table.png";
import TaskIcon from "../img/task.png";
import todo from "../img/to-do.png";
import framer from "../img/framer.png";
import coins from "../img/coins.png";
import { ReactComponent as MoonIcon } from "../img/moon.svg";
import { ReactComponent as SunIcon } from "../img/sun.svg";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Header = styled.header`
  background-color: ${(props) => props.theme.navBgColor};
  box-shadow: 0px 2px 4px rgb(0 0 0 / 10%);
  font-family: "Google Sans", "Roboto", sans-serif;
  /* position: sticky;
  top: 0;
  z-index: 100; */
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
    font-size: 1.8rem;
    color: ${(props) => props.theme.blackColor};
    margin-right: 0;
  }
`;
const TabContainer = styled.div`
  margin-right: 10vw;
  a {
    margin-left: 20px;
    color: ${(props) => props.theme.blackColor};
    font-size: 1rem;
    img {
      height: 27px;
    }
  }
`;
const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  margin: 5px;
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
  padding: 0.3rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  svg {
    height: auto;
    width: 1.3rem;
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
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleTheme = () => setDarkAtom((prev) => !prev);
  return (
    <Header>
      <NavContainer>
        <HomeIconContainer>
          <img src={todo} alt="react" />
          {/* <span>To Do</span> */}
        </HomeIconContainer>
        <TabContainer>
          <Link to={"/react/crypto_tracker"}>
            <img src={coins} alt="coins" />
          </Link>
          <Link to={"/react/todo"}>
            <img src={TaskIcon} alt="todoIcon" />
          </Link>
          <Link to={"/react/trello"}>
            <img src={TableIcon} alt="todoIcon" />
          </Link>
          <Link to={"/react/animation"}>
            <img src={framer} alt="framer" />
          </Link>
        </TabContainer>
        <BtnContainer>
          <ThemeToggle isDark={isDark} onClick={toggleTheme}>
            <SunIcon />
            <MoonIcon />
          </ThemeToggle>
        </BtnContainer>
      </NavContainer>
    </Header>
  );
}
export default Navigator;
