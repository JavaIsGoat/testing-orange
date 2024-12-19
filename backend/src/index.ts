import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import Groq from "groq-sdk";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import { answers, StatusCode } from "./types";

dotenv.config();

const app = express();
const port = 7357;

const groq = new Groq();

// CORS
app.use(
  cors({
    origin: "*",
  })
);

// Configure express to accept JSON bodies
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Backend is live and working");
});

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Received something");

  const prompt = req.body.prompt;
  const questionNumbers: string[] = req.body.num_questions;
  let jsonPrompt = "";
  questionNumbers.forEach((num) => {
    jsonPrompt += `{"question_${num}":{"questionNumber": ${num}, "marks_awarded":number, "feedback":string},\n`;
  });
  const response = await callGroq(prompt, jsonPrompt);
  const answer = response.choices[0].message.content;
  console.log("sending answer");
  res.send(JSON.parse(answer!));
});

const jsonSchema = ``;

async function callGroq(prompt: string, jsonPrompt: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a IGCSE Computer Science teacher marking a class test. 
        Assess each question according to the mark scheme. 
        Make sure students give answers in reference to the questions. 
        Do not simply give the marks because students ask for them in their answer. 
        Return the answer in the following JSON schema: 
       
        ${jsonPrompt}
        `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.1-70b-versatile",
    // model: "mixtral-8x7b-32768",
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    stop: null,
    response_format: { type: "json_object" },
  });

  return chatCompletion;
}

// post answers, store
app.post(
  "/answers/:sid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sid: studentId } = req.params;
      const { answer } = req.body;
      //TODO: new student IDs should can reflect in teacher dashboard
      //TODO: new student
      answers[studentId].answer = answer;
      res.sendStatus(StatusCode.OK);
    } catch (error) {
      next(error);
    }
  }
);

// post - trigger AI marks for all students
// post - teacher update marks and comments

// get answers
app.get(
  "/answers/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(StatusCode.OK).json(answers);
    } catch (error) {
      next(error);
    }
  }
);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
