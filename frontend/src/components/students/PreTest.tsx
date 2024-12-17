import { Box, Button, Heading, TextField } from "@radix-ui/themes";
import { useActivityTracker, useStudent } from "../../hooks";
import { useEffect, useState } from "react";

const StudentDashboard: React.FC = () => {
  const { student, setStudent } = useStudent();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    setStudent({ id: "123", name: "Joe" });
  }, []);

  const log = (message: string, sus: boolean, data?: string) => {
    console.log(message);
  };
  useActivityTracker({ addLog: log });
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
    </Box>
  );
};

export default StudentDashboard;
