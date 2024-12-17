import {
  Box,
  Button,
  Flex,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useActivityTracker, useStudent } from "../../hooks";
import { useContext, useEffect, useState } from "react";
import { log } from "console";
import { ActivityLogContext } from "../../Demo";
import NotRadixActivityLog from "../tracking/ActivityLog";
import { LogEntry } from "../../types";
import DummyQuestion from "./DummyQuestion";

const StudentDashboard: React.FC = () => {
  const { student, setStudent } = useStudent();
  const [name, setName] = useState<string>("");
  const [demoLog, setDemoLog] = useState<LogEntry[]>([]);

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

  // Integrity ((this will be a component))
  // We can detect
  // - tab and window switching
  // - copy and paste events
  // try it out!

  // Example question (this will be a component)
  // Question: Can you copy?
  // Answer: Can you paste?

  // Activity log (this will be a component)
  // All sus events + editor in/out of focus too
  // toggle for only sus events

  // Start test button
  // Figure out the fullscreen stuff from here

  return (
    <Box style={{ textAlign: "center" }}>
      <p className="Text">Welcome back, {student.name}!</p>
      <Flex style={{ justifyContent: "space-evenly" }}>
        <DummyQuestion addLog={addLog} />

        <NotRadixActivityLog activityLog={demoLog} />
      </Flex>
      <Button>Start Test</Button>
    </Box>
  );
};

export default StudentDashboard;
