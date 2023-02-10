import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Quiz = () => {
  const router = useRouter();
  const { topic } = router.query;
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(10);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/getQuestions/${topic}`);
      if (response.status === 404) {
        toast('Question Coming Soon', { position: 'bottom-center' });
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Quiz Completed</h2>
            <p className="mb-4">
              Your score is {score}/{quizQuestions.length}
            </p>
            <Link
              className="bg-violet-400 px-4 py-2 rounded-lg hover:bg-violet-500"
              href="/quiz"
            >
              Main Section
            </Link>
          </div>
        );
      }
      const data = await response.json();
      if (data.status === true) {
        setQuizQuestions(data.questions);
      }
    }
    getData();
  }, []);

  const [quizStart, setQuizStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(totalQuestions);
  const [seconds, setSeconds] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          setIsQuizFinished(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    setIsQuizFinished(true);
  };

  return (
    <div className="min-h-screen">
      {!quizStart ? (
        <div className="flex flex-col justify-center items-center py-10 px-4">
          <h2 className="font-bold text-2xl mb-4">Welcome to the Quiz</h2>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            <button
              className="bg-violet-400 w-72 px-4 py-2 rounded-lg hover:bg-violet-500"
              onClick={() => {
                setQuizStart(true);
                setTotalQuestions(10);
              }}
            >
              10 Questions
            </button>
            <button
              className="bg-violet-400 w-72 px-4 py-2 rounded-lg hover:bg-violet-500"
              onClick={() => {
                setQuizStart(true);
                setTotalQuestions(25);
              }}
            >
              25 Questions
            </button>
            <button
              className="bg-violet-400 w-72 px-4 py-2 rounded-lg hover:bg-violet-500"
              onClick={() => {
                setQuizStart(true);
                setTotalQuestions(50);
              }}
            >
              50 Questions
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-6 w-full">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
          </div>
          <div className="flex justify-center text-center">
            {isQuizFinished ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Quiz Completed</h2>
                <p className="mb-4">
                  Your score is {score}/{quizQuestions.length}
                </p>
                <Link
                  className="bg-violet-400 px-4 py-2 rounded-lg hover:bg-violet-500"
                  href="/quiz"
                >
                  Main Section
                </Link>
              </div>
            ) : (
              <div className="lg:w-2/3 w-full">
                <h2 className="text-xl font-bold mb-4 ">
                  {currentQuestion + 1}.{' '}
                  {quizQuestions[currentQuestion].question}
                </h2>
                <div className="mb-6">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-2 mb-4 ${
                          selectedOption === option
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-300'
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        <span
                          className={`w-3 h-3 mr-2 rounded-full ${
                            selectedOption === option
                              ? 'bg-gray-300'
                              : 'bg-violet-500'
                          }`}
                        ></span>
                        <p className="font-medium">{option}</p>
                      </div>
                    )
                  )}
                </div>
                <p
                  className={`mb-4 font-bold text-xl ${
                    minutes < 2 ? 'text-red-500' : 'text-green-400'
                  }`}
                >
                  Time remaining: {minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
                <div className="flex justify-between">
                  {currentQuestion > 0 && (
                    <button
                      className="bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500"
                      onClick={handlePreviousQuestion}
                    >
                      Previous
                    </button>
                  )}
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <button
                      className="bg-violet-400 px-4 py-2 rounded-lg hover:bg-violet-500"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="bg-violet-400 px-4 py-2 rounded-lg hover:bg-violet-500"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quiz;
