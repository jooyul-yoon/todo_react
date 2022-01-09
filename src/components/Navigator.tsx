import { Link } from "react-router-dom";
import styled from "styled-components";
import TableIcon from "../img/table.png";
import TaskIcon from "../img/task.png";
import todo from "../img/to-do.png";

const Header = styled.header`
  background-color: #fff;
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
      height: 25px;
    }
  }
`;

function Navigator() {
  return (
    <Header>
      <NavContainer>
        <HomeIconContainer>
          <img src={todo} alt="react" />
          {/* <span>To Do</span> */}
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
