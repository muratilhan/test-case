const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateQuestion = async () => {
  const genAI = new GoogleGenerativeAI(process.env.CHAT_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `ask me a question about life, movies, culture etc.`;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};

module.exports = generateQuestion;
