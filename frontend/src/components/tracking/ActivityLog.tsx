import { useEffect, useRef, useState } from "react";
import { LogEntry } from "../../types";
import {
  Box,
  Button,
  Flex,
  ScrollArea,
  SegmentedControl,
  Strong,
} from "@radix-ui/themes";

interface ActivityLogProps {
  activityLog: LogEntry[];
}
const NotRadixActivityLog = ({ activityLog }: ActivityLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [onlySus, setOnlySus] = useState<boolean>(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activityLog]); // Scroll when activityLog changes

  return (
    <Flex
      direction="column"
      gap={"0.5rem"}
      style={{ height: 300, width: 360, margin: "1rem" }}
    >
      <Strong>Activity Log</Strong>
      <SegmentedControl.Root defaultValue="all">
        <SegmentedControl.Item value="all">All</SegmentedControl.Item>
        <SegmentedControl.Item value="sus">Only Sus</SegmentedControl.Item>
      </SegmentedControl.Root>
      <ScrollArea
        type="always"
        scrollbars="vertical"
        ref={scrollRef}
        // style={{
        //   width: "400px",
        //   marginTop: "20px",
        //   overflowY: "auto",
        //   background: "#f9f9f9",
        //   padding: "10px",
        //   border: "1px solid #ddd",
        //   borderRadius: "4px",
        //   fontSize: "14px",
        //   whiteSpace: "pre-wrap",
        // }}
      >
        <Box pr={"1rem"}>
          {activityLog.map((entry, index) => (
            <div
              key={index}
              style={{
                textAlign: "left",
                marginBottom: "5px",
                ...(entry.sus && { color: "#BA6000" }),
              }}
            >
              [{entry.timestamp}] {entry.message}
            </div>
          ))}
        </Box>
      </ScrollArea>
    </Flex>
  );
};

export default NotRadixActivityLog;
