import { useEffect, useMemo, useState } from "react";
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
  Button,
} from "@radix-ui/themes";
import axios from "axios";
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
  maximumMarks: 10,
  markScheme: [
    "Identification of Key Events (4 marks)",
    "1 mark for each correctly identified major geopolitical event.",
    "Events could include:",
    "- Major elections (e.g., Taiwan, Indonesia, India)",
    "- Significant diplomatic developments (e.g., U.S.-China relations)",
    "- Regional conflicts or tensions (e.g., North Korea's actions)",
    "- Economic agreements or disruptions (e.g., ASEAN summits)",
    "Analysis of Events (4 marks)",
    "- 1 mark for each event analyzed in terms of its implications for regional stability, international relations, or economic impacts.",
    "- Students should demonstrate understanding of how these events interact with global geopolitics.",
    "Contextualization (2 marks)",
    "- 1 mark for placing events within the broader geopolitical landscape of Asia.",
    "- 1 mark for discussing the significance of these events in relation to global trends (e.g., multipolarity, rising nationalism).",
  ],
};

export type Answer = {
  answer: string;
  mark_awarded?: number;
  ai_feedback?: string;
  teacher_feedback?: string;
  teacher_mark?: number;
};

type AnswersResponse = {
  [key: string]: Answer;
};

const Answers = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [teacherFeedback, setTeacherFeedback] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [answersData, setAnswersData] = useState<AnswersResponse>({});
  const [error, setError] = useState<string>("");
  const [teacherMarks, setTeacherMarks] = useState<number>();
  const [isMarking, setIsMarking] = useState(false);

  const allStudentsMarked = useMemo(() => {
    return Object.values(answersData).every(
      (answer) => answer.mark_awarded !== undefined
    );
  }, [answersData]);

  useEffect(() => {
    //for debugging
  });
  const hasChanges = useMemo(() => {
    const feedbackChanged =
      answersData[selectedStudent]?.teacher_feedback !== teacherFeedback;
    const markChanged =
      teacherMarks === undefined
        ? false
        : teacherMarks !==
          (answersData[selectedStudent]?.teacher_mark ??
            answersData[selectedStudent]?.mark_awarded);
    return feedbackChanged || markChanged;
  }, [answersData, selectedStudent, teacherFeedback, teacherMarks]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:7357/answers/list");
        if (!response.data) {
          throw new Error("Failed to fetch answers");
        }
        const data: AnswersResponse = response.data;
        setAnswersData(data);
        // Set the first student as selected when data loads
        const firstStudentId = Object.keys(data)[0];
        setSelectedStudent(firstStudentId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setTeacherFeedback(answersData[selectedStudent]?.teacher_feedback || "");
      setTeacherMarks(answersData[selectedStudent]?.teacher_mark);
    }
  }, [answersData, selectedStudent]);

  const handleUpdateAnswer = async () => {
    if (!selectedStudent) return;

    try {
      const response = await axios.put(
        `http://localhost:7357/answers/${selectedStudent}`,
        {
          teacher_mark: teacherMarks,
          teacher_feedback: teacherFeedback,
        }
      );

      if (response.status === 200) {
        // Update local state to reflect changes
        setAnswersData((prev) => ({
          ...prev,
          [selectedStudent]: {
            ...prev[selectedStudent],
            teacher_mark: teacherMarks,
            teacher_feedback: teacherFeedback,
          },
        }));
      }
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const handleMark = async () => {
    try {
      setIsMarking(true);
      const response = await axios.post(
        "http://localhost:7357/answers/generate-marks"
      );

      if (response.status === 200) {
        // Refresh the answers data to get the new marks
        console.log("Marking has began");
      }
    } catch (error) {
      console.error("Error generating marks:", error);
      setError("Failed to generate marks");
    } finally {
      // setIsMarking(false);
    }
  };

  const adjustMarks = (increment: boolean) => {
    const currentMark =
      teacherMarks ?? answersData[selectedStudent]?.mark_awarded;
    if (currentMark === undefined) return;
    const newMark = increment ? currentMark + 1 : currentMark - 1;
    if (newMark >= 0 && newMark <= questionData.maximumMarks) {
      setTeacherMarks(newMark);
    }
  };

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
        <Flex gap="3" p="2" mb="2">
          <Card style={{ "--card-border-width": 0 } as React.CSSProperties}>
            <Button
              onClick={handleMark}
              disabled={allStudentsMarked || isMarking}
            >
              {isMarking ? "Marking..." : "Mark"}
            </Button>
          </Card>

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
                if (hasChanges) {
                  const confirmLeave = window.confirm(
                    "You have unsaved changes. Do you want to leave without saving?"
                  );
                  if (!confirmLeave) {
                    return;
                  }
                }
                setSelectedStudent(studentId);
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
            <Text size="5" mb="4" weight="bold"></Text>
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
              <Flex align="center" gap="2">
                <Badge
                  size="2"
                  color={
                    hasChanges &&
                    answersData[selectedStudent]?.teacher_feedback ===
                      teacherFeedback
                      ? "orange"
                      : "blue"
                  }
                >
                  {teacherMarks !== undefined
                    ? teacherMarks
                    : answersData[selectedStudent].mark_awarded}
                  /{questionData.maximumMarks}
                </Badge>
                <Flex direction="column" gap="1">
                  <Button
                    variant="ghost"
                    onClick={() => adjustMarks(true)}
                    size="1"
                    color="gray"
                  >
                    ▲
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => adjustMarks(false)}
                    size="1"
                    color="gray"
                  >
                    ▼
                  </Button>
                </Flex>
              </Flex>
            </Card>

            {/* Mark Scheme */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                Mark Scheme
              </Text>
              <br></br>
              {questionData.markScheme.map((scheme, index) => (
                <Text key={index} size="2" mb="2">
                  {scheme}
                  <br></br>
                </Text>
              ))}
            </Card>

            {/* AI Feedback */}
            <Card>
              <Text size="3" weight="bold" mb="2">
                AI Feedback
              </Text>
              <br></br>
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
                onChange={(e) => {
                  setTeacherFeedback(e.target.value);
                }}
                placeholder="Add your comments here..."
              />
            </Card>

            <Card>
              <Flex justify="start">
                <Button disabled={!hasChanges} onClick={handleUpdateAnswer}>
                  Save Changes
                </Button>
              </Flex>
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
// AI feedback
