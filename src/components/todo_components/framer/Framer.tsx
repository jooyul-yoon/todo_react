import React from "react";
import styled from "styled-components";
import Navigator from "../../Navigator";
import { motion } from "framer-motion";

// export const MyComponent=({isVisible})=>(<motion.div animate={{opacity: isVisible? 1: 0}} />)

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function Framer() {
  return (
    <>
      <Navigator />
      <Wrapper>
        <Box />
        <motion.div>Hi</motion.div>
      </Wrapper>
    </>
  );
}

export default React.memo(Framer);
