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
    const given = req.body.answer;
    const question = req.body.question;
    const areas = req.body.areas;

    const gptResponse = await openai.createChatCompletion(
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant to learn coding. You give back JSON containing an array of areas named areasToImprove and one string of explanation in plain english for good and bad answers so the user gets some feedback, without code and short, additional calculate points from 0 to 100 for the given answer and give back points too. If everything is okay give back an empty array and a nice explanation as the explanation field to keep the student engaged.",
          },
          {
            role: "user",
            content: `${question} - Given answer: ${givenAnswer} Please analyse and return an array with areas which should be improved of the following areas: ${areas}`,
          },
        ],
      },
      { responseType: "json" }
    );

    const botMessage = gptResponse.data.choices[0].message?.content;

    return res.status(200).json({
      message: "Success",
      response: JSON.parse(botMessage),
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
