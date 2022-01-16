import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Navigator from "../../Navigator";

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Grid = styled.div`
  width: 50vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;
const Box = styled(motion.div)`
  height: 100px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
`;

function Practice2() {
  const [id, setId] = useState<string | null>(null);

  return (
    <>
      <Navigator />
      <Wrapper>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <Box onClick={() => setId(n)} key={n} layoutId={n} />
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Box layoutId={id} style={{ width: 200, height: 100 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}
export default Practice2;
