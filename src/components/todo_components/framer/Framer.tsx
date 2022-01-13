import React from "react";
import styled from "styled-components";
import Navigator from "../../Navigator";
import { motion, Variants } from "framer-motion";

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;
const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Circle = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.lightAccent};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  place-self: center;
`;

const myVar1: Variants = {
  start: { scale: 0.5, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const circleVar: Variants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};
function Framer() {
  return (
    <>
      <Navigator />
      <Wrapper>
        <Box
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotateZ: 360 }}
          transition={{ type: "spring", bounce: 0.5 }}
        />
        <Box variants={myVar1} initial="start" animate="end">
          <Circle variants={circleVar} />
          <Circle variants={circleVar} />
          <Circle variants={circleVar} />
          <Circle variants={circleVar} />
        </Box>
        <Box />
        <Box />
      </Wrapper>
    </>
  );
}

export default React.memo(Framer);
