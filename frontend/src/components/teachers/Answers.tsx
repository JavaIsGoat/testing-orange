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
  Spinner,
} from "@radix-ui/themes";
import BrianWongQ from "../students/questions/BrianWong";

export interface Question {
  questionNumber: number;
  questionText: string;
  maximumMarks: number;
  markScheme: string[];
}

const questionData: Question = {
  questionNumber: 1,
  questionText: "",
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

type AnswersResponse = {
  [key: string]: Answer;
};

const Answers = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [teacherFeedback, setTeacherFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [answersData, setAnswersData] = useState<AnswersResponse>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:7357/answers/list");
        if (!response.ok) {
          throw new Error("Failed to fetch answers");
        }
        const data: AnswersResponse = await response.json();
        setAnswersData(data);
        // Set the first student as selected when data loads
        const firstStudentId = Object.keys(data)[0];
        setSelectedStudent(firstStudentId);
        setTeacherFeedback(data[firstStudentId]?.teacher_feedback || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spinner size="1" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p="4">
        <Text color="red" size="3">
          {error}
        </Text>
      </Box>
    );
  }

  if (!Object.keys(answersData).length) {
    return (
      <Box p="4">
        <Text size="3">No answers available</Text>
      </Box>
    );
  }

  return (
    <Box p="4">
      {/* Student Selector */}
      <ScrollArea
        type="always"
        scrollbars="horizontal"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <Flex gap="3" p="2">
          {Object.keys(answersData).map((studentId) => (
            <Card
              key={studentId}
              style={{
                cursor: "pointer",
                minWidth: "100px",
                backgroundColor:
                  selectedStudent === studentId ? "orange" : "white",
              }}
              onClick={() => {
                setSelectedStudent(studentId);
                setTeacherFeedback(
                  answersData[studentId].teacher_feedback || ""
                );
              }}
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
            <BrianWongQ studentAnswer={answersData[selectedStudent].answer} />
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
                {answersData[selectedStudent]?.mark_awarded} /{" "}
                {questionData.maximumMarks}
              </Badge>
            </Card>

            {/* Mark Scheme */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                Mark Scheme
              </Text>
              {questionData.markScheme.map((scheme, index) => (
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
              <Text size="2">{answersData[selectedStudent]?.ai_feedback}</Text>
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

// Right:
// givenMark/TotalMark
// with arrows to configure and change
// AI feedback
// Editable teacher comment box
