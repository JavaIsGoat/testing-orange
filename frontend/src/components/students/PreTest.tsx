import { Box, Button, TextField } from "@radix-ui/themes";
import { useStudent } from "../../hooks";
import { useState } from "react";

const StudentDashboard: React.FC = () => {
  const { student, setStudent } = useStudent();
  const [name, setName] = useState<string>("");

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

  return (
    <div>
      <h1 className="Heading1">Student Dashboard</h1>
      <p className="Text">Welcome back, {student.name}!</p>
    </div>
  );
};

export default StudentDashboard;
