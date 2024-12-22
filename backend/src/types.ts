// HTTP Status Codes

export enum StatusCode {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export interface Question {
  questionNumber: number;
  questionText: string;
  maximumMarks: number;
  markScheme: string[];
}

export type Answer = {
  answer: string;
  mark_awarded?: number;
  teacher_mark?: number;
  ai_feedback?: string;
  teacher_feedback?: string;
};

export let answers: Record<string, Answer> = {
  "123": {
    answer: ``,
    //     `
    // In 2024, significant geopolitical events in Asia included:
    // 1. Taiwan's Presidential Election: Lai Ching-te was elected president, leading to a shift in legislative power and potential challenges in U.S.-Taiwan relations as he navigates a divided legislature
    // 2. North Korea's Military Escalation: North Korea terminated its military agreement with South Korea, increasing tensions and announcing plans to enhance its nuclear capabilities amid ongoing provocations
    // 3. Major Elections Across Asia: Countries like Indonesia and India held crucial elections, impacting regional politics and governance amid rising nationalism and economic challenges
    //     `
    teacher_feedback: "",
  },
  "456": {
    answer: `In 2024, I think some big things happened in Asia, but I'm not really sure. Maybe there was an election in Taiwan? I heard something about that. Also, I think North Korea did something again—maybe they were being aggressive or something like that. And there might have been some other elections in countries like India or Indonesia, but honestly, I don't know what they were about. I guess people were just voting and stuff. Overall, it sounds like Asia was busy with politics, but I can't really say much more than that!
`,
    teacher_feedback: "",
  },
};
