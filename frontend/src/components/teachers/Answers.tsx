import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  ScrollArea,
  Card,
  TextField,
  Badge,
  TextArea,
} from "@radix-ui/themes";
import BrianWongQ from "../students/questions/BrianWong";

export interface Question {
  questionNumber: number;
  questionText: string;
  maximumMarks: number;
  markScheme: string[];
}

const questionData: any = {
  maximumMarks: 2,
  markScheme: [
    "[1] India and China are the two countries with politically tense relations",
    "[1] This is because of border disputes, which have escalated in recent times.",
  ],
};

export type Answer = {
  answer: string;
  mark_awarded?: number;
  ai_feedback?: string;
  teacher_feedback?: string;
};

const Answers = () => {
  const [selectedStudent, setSelectedStudent] = useState("123");
  const [teacherFeedback, setTeacherFeedback] = useState(
    responseData[selectedStudent].teacher_feedback
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //axios hook
    //http://localhost:7357/answers/list
    //example response
    //{
    //   "123": { answer: "", mark_awarded: 1, ai_feedback: "", teacher_feedback: "" },
    //   "456": { answer: "", mark_awarded: 1, ai_feedback: "", teacher_feedback: "" },
    // };
  }, []);

  return (
    <Box p="4">
      {/* Student Selector */}
      <ScrollArea
        type="always"
        scrollbars="horizontal"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <Flex gap="3" p="2">
          {Object.keys(responseData).map((studentId) => (
            <Card
              key={studentId}
              style={{
                cursor: "pointer",
                minWidth: "100px",
                backgroundColor:
                  selectedStudent === studentId ? "var(--accent-3)" : "white",
              }}
              onClick={() => setSelectedStudent(studentId)}
            >
              <Text size="2">Student {studentId}</Text>
            </Card>
          ))}
        </Flex>
      </ScrollArea>

      {/* Main Content */}
      <Flex gap="6">
        {/* Left Side - Question and Answer */}
        <Box style={{ flex: 1 }}>
          <Card>
            <Text size="5" mb="4" weight="bold">
              Question & Answer
            </Text>
            <BrianWongQ studentAnswer={responseData[selectedStudent].answer} />
          </Card>
        </Box>

        {/* Right Side - Feedback and Marks */}
        <Box style={{ flex: 1 }}>
          <Flex direction="column" gap="4">
            {/* Marks */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                Marks Awarded
              </Text>
              <Badge size="2" color="blue">
                {responseData[selectedStudent].mark_awarded} /{" "}
                {questionData.maximumMarks}
              </Badge>
            </Card>

            {/* Mark Scheme */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                Mark Scheme
              </Text>
              {questionData.markScheme.map((scheme: any, index: any) => (
                <Text key={index} size="2" mb="2">
                  {scheme}
                </Text>
              ))}
            </Card>

            {/* AI Feedback */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                AI Feedback
              </Text>
              <Text size="2">{responseData[selectedStudent].ai_feedback}</Text>
            </Card>

            {/* Teacher Feedback */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                Teacher Comments
              </Text>
              <TextArea
                size="3"
                value={teacherFeedback}
                onChange={(e) => setTeacherFeedback(e.target.value)}
                placeholder="Add your comments here..."
              />
            </Card>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Answers;

// Scroll view:
// All students names (Q: does Bwong know student names lol?)

// Left:
// Question
// Student Answer

// Right:
// givenMark/TotalMark
// with arrows to configure and change
// AI feedback
// Provided mark scheme
// Editable teacher comment box
