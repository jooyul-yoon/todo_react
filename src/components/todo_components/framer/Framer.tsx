import React, { useRef } from "react";
import styled from "styled-components";
import Navigator from "../../Navigator";
import { motion, Variants } from "framer-motion";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const BoxContainer = styled.div`
  place-self: center;
  width: 25vw;
  height: 25vw;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) => props.theme.boxContainerColor};
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  width: 100px;
  height: 100px;
  background-color: #ececec;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Circle = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  place-self: center;
`;

const boxVar1: Variants = {
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
const boxVar2: Variants = {
  hover: { scale: 1.2, rotateZ: 90 },
  click: { scale: 0.8, borderRadius: "50px" },
};
const boxVar3: Variants = {
  hover: { scale: 1, rotateZ: 90 },
  click: { scale: 0.8, borderRadius: "50px" },
  drag: { backgroundColor: "rgb(35, 204, 113)" },
};
const circleVar: Variants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

function Framer() {
  const boxContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Navigator />
      <Wrapper>
        <BoxContainer>
          <Box
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotateZ: 360 }}
            transition={{ type: "spring", bounce: 0.5 }}
          />
        </BoxContainer>
        <BoxContainer>
          <Box variants={boxVar1} initial="start" animate="end">
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
          </Box>
        </BoxContainer>
        <BoxContainer>
          <Box variants={boxVar2} whileHover="hover" whileTap="click" />
        </BoxContainer>
        <BoxContainer ref={boxContainerRef}>
          <Box
            drag
            dragElastic={0}
            dragConstraints={boxContainerRef}
            variants={boxVar3}
            whileHover="hover"
            whileTap="click"
            whileDrag="drag"
          />
        </BoxContainer>
      </Wrapper>
    </>
  );
}

export default React.memo(Framer);
