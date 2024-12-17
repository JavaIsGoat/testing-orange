import { Box, TextArea } from "@radix-ui/themes";

interface DummyQuestionProps {
  addLog: (message: string, sus: boolean, data?: string) => void;
}

const DummyQuestion = ({ addLog }: DummyQuestionProps) => {
  return (
    <Box>
      <h2>Can you copy this text?</h2>
      <TextArea
        style={{ width: "400px" }}
        placeholder="Try pasting here..."
        onFocus={() => addLog("Editor focused", false)}
        onBlur={() => addLog("Editor lost focus", false)}
      ></TextArea>
    </Box>
  );
};

export default DummyQuestion;
