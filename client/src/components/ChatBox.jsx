import React, { useContext, useEffect, useState } from "react";
import "./chatbox.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ChatBox = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [isFetchingQuestion, setIsFetchingQuestion] = useState(false);

  const context = useContext(AuthContext);
  const userId = context?.user?._id;

  const startChatting = (e) => {
    e.preventDefault();
    setChatStarted(true);
    setCurrentQuestion((prev) => prev + 1);
    console.log("asd");
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsFetchingQuestion(true);

      const response = await axios.get(
        "http://localhost:8800/chatbot/generate-question"
      );
      console.log(response);
      setQuestions([...questions, response.data]);
      setIsFetchingQuestion(false);
    };

    const saveAnswers = async () => {
      const response = await axios.post(
        "http://localhost:8800/answer/add-answer",
        { questions, answers, userId }
      );
      console.log(response);
    };

    if (currentQuestion > 0 && currentQuestion < 11) {
      fetchQuestion();
    }
    if (currentQuestion > 10) {
      saveAnswers();
    }
  }, [currentQuestion]);

  const sendAnswer = () => {
    setAnswers([...answers, currentAnswer]);
    setCurrentAnswer("");
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="chatbox-container">
      <h1>Bolt-Chatbot</h1>

      {!chatStarted && (
        <button onClick={startChatting}> Let's get started!</button>
      )}
      {questions?.map((item, index) => (
        <div>
          <div className="question">
            {index + 1} - {item}
          </div>
          <div className="answer">
            <span style={{ padding: answers[index] ? "0.5rem 0.7rem" : "" }}>
              {answers[index]}
            </span>
          </div>
        </div>
      ))}

      {chatStarted && !isFetchingQuestion && currentQuestion < 11 && (
        <div>
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="type your answer"
          />
          <button onClick={sendAnswer}>Send Answer</button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
