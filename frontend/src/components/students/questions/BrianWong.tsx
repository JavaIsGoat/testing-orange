import { Box, TextArea } from "@radix-ui/themes";

interface BrianWongQProps {
  addLog: (message: string, sus: boolean, data?: string) => void;
}

const BrianWongQ = ({ addLog }: BrianWongQProps) => {
  return (
    <Box>
      <h2>Can you copy this text?</h2>
      <TextArea
        style={{ width: "400px" }}
        placeholder="Try pasting here..."
        onFocus={() => addLog("Editor focused", false)}
        onBlur={() => addLog("Editor lost focus", false)}
        maxLength={200}
      ></TextArea>
    </Box>
  );
};

export default BrianWongQ;
