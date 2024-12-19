import { Flex, Text, Button } from "@radix-ui/themes";
import DummyQuestion from "./DummyQuestion";
import { useState, useEffect } from "react";
import { requestFullScreen } from "../../types";
import BrianWongQ from "./questions/BrianWong";
import { useStudent } from "../../hooks";
import axios from "axios";
import { stringify } from "querystring";

// This component should work in fullscreen only
// Enter fullscreen and exit fullscreen should be logged too

// Light colourful bg with animations

// Question text area needs live word count (New component based on Radix)
// Need to go to fortress to try other devices

const Test = () => {
  const { student, setStudent } = useStudent();
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

  useEffect(() => {
    setStudent({ id: "123", name: "Joe" });
  }, []);

  const submitAnswer = async (answer: string) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL!}/answers/${student?.id}`,
      { answer },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  if (!isFullscreen && false) {
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
      <BrianWongQ addLog={() => {}} submitAnswer={submitAnswer} />
    </Flex>
  );
};

export default Test;
