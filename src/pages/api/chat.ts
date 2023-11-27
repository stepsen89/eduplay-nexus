import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, please use POST" });
  }

  try {
    const givenAnswer = req.body.answer;
    const areas = req.body.areas;

    let messages = [
      {
        role: "system",
        content: "You are a helpful coding assistant",
      },
    ];

    // Please analyse the code and return areas which should be improved: Variables, Functions, Scopes - only mention the area and no explanation. return an array of areas with the name of the area, if none, return empty array

    messages.push({
      role: "user",
      content: `${givenAnswer} Please analyse this code and return an array with areas which should be improved of the following areas: ${areas} - only mention the area and no further explanation. if none, return empty array`,
    });

    const gptResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: messages,
    });

    const botMessage = gptResponse.data.choices[0].message?.content;
    console.log(botMessage);
    return res.status(200).json({
      message: "Success",
      response: botMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
