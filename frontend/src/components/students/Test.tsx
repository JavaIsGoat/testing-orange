import { Flex, Text, Button } from "@radix-ui/themes";
import DummyQuestion from "./DummyQuestion";
import { useState, useEffect } from "react";
import { requestFullScreen } from "../../types";
import BrianWongQ from "./questions/BrianWong";
// This component should work in fullscreen only
// Show Radix dialog when not in fullscreen to go to fullscreen
// Enter fullscreen and exit fullscreen should be logged too

// Light colourful bg with animations

// Question text area needs live word count (New component based on Radix)
// Need to go to fortress to try other devices

const Test = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = document.fullscreenElement !== null;
      setIsFullscreen(fullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!isFullscreen) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Button onClick={requestFullScreen}>
          Enter Fullscreen to Continue
        </Button>
      </Flex>
    );
  }

  return (
    <Flex style={{ margin: "auto" }} direction="column" gap="2" width={"400px"}>
      <BrianWongQ addLog={() => {}} />
      <Button>Let's go</Button>
    </Flex>
  );
};

export default Test;
