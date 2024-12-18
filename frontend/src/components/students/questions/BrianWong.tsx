import { Box, TextArea, Text, Button } from "@radix-ui/themes";
import { useState } from "react";

interface BrianWongQProps {
  addLog: (message: string, sus: boolean, data?: string) => void;
}

const BrianWongQ = ({ addLog }: BrianWongQProps) => {
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 600;

  const getColor = () => {
    if (charCount < 200) {
      return "gray";
    } else if (charCount < 400) {
      return "orange";
    } else if (charCount < 550) {
      return "green";
    } else if (charCount < 600) {
      return "orange";
    }
    return "red"; // exceeding word count
  };
  return (
    <Box>
      <h2>What were the biggest geopolitical events in Asia in 2024?</h2>
      <div style={{ position: "relative" }}>
        <TextArea
          autoSave="on"
          autoCorrect="on"
          style={{
            width: "400px",
            height: "250px",
            paddingBottom: "25px", // Make room for the counter
          }}
          placeholder="Chaina Chaina Chaina..."
          onFocus={() => addLog("Editor focused", false)}
          onBlur={() => addLog("Editor lost focus", false)}
          onChange={(e) => setCharCount(e.target.value.length)}
        />
        <Text
          size="1"
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            color: getColor(),
            pointerEvents: "none", // Prevents text selection of the counter
          }}
        >
          {charCount}/{MAX_CHARS}
        </Text>
      </div>
      <br></br>
      <Button disabled={charCount < 1 || charCount > MAX_CHARS}>Submit</Button>
    </Box>
  );
};

export default BrianWongQ;
