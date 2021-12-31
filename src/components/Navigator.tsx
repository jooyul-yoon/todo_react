import { Link } from "react-router-dom";
import styled from "styled-components";
import TableIcon from "../icons/0cells.png";
import TaskIcon from "../icons/0list-text.png";

const Header = styled.header`
  background-color: #fff;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 10%);
  font-family: "Google Sans", "Roboto", sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 10vw;
`;
const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;
const HomeIconContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 43px;
    margin-right: 10px;
  }
  span {
    font-size: 1.8rem;
    color: ${(props) => props.theme.blackColor};
    margin-right: 0;
  }
`;
const TabContainer = styled.div`
  a {
    margin-left: 20px;
    color: ${(props) => props.theme.blackColor};
    font-size: 1rem;
    img {
      height: 25px;
    }
  }
`;

function Navigator() {
  return (
    <Header>
      <NavContainer>
        <HomeIconContainer>
          <img
            src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667"
            alt="react"
          />
          <span>React Master</span>
        </HomeIconContainer>
        <TabContainer>
          <Link to={"/todo"}>
            <img src={TaskIcon} alt="todoIcon" />
          </Link>
          <Link to={"/trello"}>
            <img src={TableIcon} alt="todoIcon" />
          </Link>
        </TabContainer>
      </NavContainer>
    </Header>
  );
}
export default Navigator;
