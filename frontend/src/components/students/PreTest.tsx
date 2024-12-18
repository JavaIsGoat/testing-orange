import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useActivityTracker, useStudent } from "../../hooks";
import { useContext, useEffect, useState } from "react";
import { LogEntry, requestFullScreen } from "../../types";
import DummyQuestion from "./DummyQuestion";
import NotRadixActivityLog from "./ActivityLog";
import { Navigate, useNavigate } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const { student, setStudent } = useStudent();
  const [name, setName] = useState<string>("");
  const [demoLog, setDemoLog] = useState<LogEntry[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setStudent({ id: "123", name: "Joe" });
  }, []);

  const addLog = (message: string, sus: boolean = false) => {
    const timestamp = new Date().toLocaleTimeString();
    setDemoLog((prev) => [...prev, { message, sus, timestamp }]);
  };

  useActivityTracker({ addLog });
  if (!student?.name) {
    return (
      <Box style={{ textAlign: "center" }}>
        <h2>What's your name?</h2>
        <TextField.Root
          placeholder="Jimmy Donaldson.."
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>

        <br></br>
        <Button onClick={() => setStudent({ id: "123", name: name })}>
          Confirm
        </Button>
      </Box>
    );
  }

  //Test name
  //(subtitle) Basic test details: duration

  // Integrity notice.
  // We can detect
  // - tab and window switching
  // - copy and paste events
  // try it out!

  // Start test button
  // Figure out the fullscreen stuff from here

  return (
    <Box style={{ textAlign: "center" }}>
      <p className="Text">Welcome back, {student.name}!</p>
      <Flex style={{ justifyContent: "space-evenly" }}>
        <DummyQuestion addLog={addLog} />

        <NotRadixActivityLog activityLog={demoLog} />
      </Flex>
      <Button
        onClick={() => {
          requestFullScreen();
          navigate("/student/test");
        }}
      >
        Start Test
      </Button>
      {/* <Dialog.Root>
        {isFullscreen ? (
          <Button
            onClick={() => {
              navigate("/student/test");
            }}
          >
            Start Test
          </Button>
        ) : (
          <Dialog.Trigger>
            <Button>Start Test</Button>
          </Dialog.Trigger>
        )}
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Start Test</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            You must be in fullscreen to take this test.
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={() => {
                  enterFullscreen();
                }}
              >
                Go fullscreen
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root> */}
    </Box>
  );
};

export default StudentDashboard;
