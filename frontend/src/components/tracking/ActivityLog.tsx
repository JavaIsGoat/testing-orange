import { useContext, useEffect, useRef } from "react";
import { ActivityLogContext } from "../../Demo";

const ActivityLog: React.FC = () => {
  const { activityLog } = useContext(ActivityLogContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activityLog]); // Scroll when activityLog changes

  return (
    <div
      ref={scrollRef}
      style={{
        width: "400px",
        marginTop: "20px",
        maxHeight: "200px",
        overflowY: "auto",
        background: "#f9f9f9",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
        whiteSpace: "pre-wrap",
      }}
    >
      <strong>Activity Log:</strong>
      {activityLog.map((entry, index) => (
        <div
          key={index}
          style={{
            marginBottom: "5px",
            ...(entry.sus && { color: "red" }),
          }}
        >
          [{entry.timestamp}] {entry.message}
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
