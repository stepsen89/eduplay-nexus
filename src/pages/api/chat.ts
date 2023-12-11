import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, please use POST" });
  }

  try {
    const givenAnswer = req.body.answer;
    const question = req.body.question;

    const areas = req.body.areas;

    const gptResponse = await openai.createChatCompletion(
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful JavaScript coding assistant. You are given a question, a topic and an answer to it. Please give back a JSON containing 'points' property from 0 to 100, an 'explanation' property for the answer with feedback, please only plain english and no code. Also give back a new question in this topics in a newQuestion property to ask the user to keep them engaged, this question must be answerable with code and should have no relation to the previous answer, so the user starts from an empty slate. Additionally add a few labels which fits the question. Try to keep the questions simple, and the user should only need to answer with code",
          },
          {
            role: "user",
            content: `${question.challengeInstruction} - Given answer: ${givenAnswer} Overall area for next question: ${areas}`,
          },
        ],
      },
      { responseType: "json" }
    );

    const botMessage = gptResponse.data.choices[0].message?.content;

    console.log(botMessage);
    return res.status(200).json({
      message: "Success",
      response: JSON.parse(botMessage),
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
