export enum ScreenType {
  START = "start",
  EDITOR = "editor",
  END = "end",
}

export enum TestType {
  COMP_SCI = "comp_sci",
}

export interface LogEntry {
  message: string;
  sus: boolean;
  timestamp: string;
}

export interface Question {
  questionNumber: number;
  questionText: string;
  maximumMarks: number;
  markScheme: string[];
}

export interface MarkResponse {
  [key: string]: {
    marks_awarded: number;
    feedback: string;
  };
}

export const questions: Question[] = [
  {
    questionNumber: 1,
    questionText: `An online shop makes use of encryption when transmitting data between their server and customer’s computers. Explain the purpose of using encryption in this case.`,
    maximumMarks: 2,
    markScheme: [
      `Any data that is sent will be encoded in an unreadable form (1).
This prevents eavesdroppers/hackers reading it (1) and then using it to steal data such as credit card details (1).
`,
    ],
  },
  {
    questionNumber: 2,
    questionText: `The encryption method used by the shop is asymmetric encryption. The shop’s server makes a public and private key which it uses in this process. Describe how the public and private keys are used when transmitting data from a customer’s computer to the shop’s server.
`,
    maximumMarks: 3,
    markScheme: [
      `The shop’s server sends the public key to the customer’s computer. (1)
The customer’s computer encrypts any data (such as form data) using the
public key. (1)
The encrypted data is transmitted via the Internet. (1)
The shop’s server uses the private key to decrypt the data. (1)
`,
    ],
  },
  // Add more questions as needed
];
