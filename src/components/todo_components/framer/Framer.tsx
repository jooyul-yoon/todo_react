import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navigator from "../../Navigator";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  Variants,
} from "framer-motion";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const BoxContainer = styled(motion.div)`
  place-self: center;
  width: 25vw;
  height: 25vw;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
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
const Svg = styled.svg`
  width: 70px;
  place-self: center;
  color: transparent;
  path {
    stroke: white;
    stroke-width: 3;
  }
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
const svgVar: Variants = {
  start: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  end: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};
const AniPresenceVar: Variants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, rotateZ: 360 },
  leaving: { opacity: 0, scale: 0, y: 20 },
};

function Framer() {
  const boxContainerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-360, 360]);
  const background = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(135deg, rgb(0, 222, 238), rgb(0, 36, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(202, 238, 0), rgb(0, 238, 127))",
    ]
  );
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(!showing);

  useEffect(() => {
    // scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  }, [scrollY, scrollYProgress]);

  return (
    <>
      <Navigator />
      <Wrapper>
        <BoxContainer>
          <AnimatePresence>
            {showing ? (
              <Box
                variants={AniPresenceVar}
                initial="initial"
                animate="visible"
                exit="leaving"
              />
            ) : null}
          </AnimatePresence>
          <button onClick={toggleShowing}>Click</button>
        </BoxContainer>
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
            dragElastic={0.1}
            dragConstraints={boxContainerRef}
            variants={boxVar3}
            whileHover="hover"
            whileTap="click"
            whileDrag="drag"
          />
        </BoxContainer>
        <BoxContainer style={{ background }}>
          <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
        </BoxContainer>
        <BoxContainer>
          <Svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <motion.path
              variants={svgVar}
              initial="start"
              animate="end"
              transition={{
                default: { duration: 5 },
                fill: { delay: 3, duration: 2 },
              }}
              d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
            ></motion.path>
          </Svg>
        </BoxContainer>
      </Wrapper>
    </>
  );
}

export default React.memo(Framer);
