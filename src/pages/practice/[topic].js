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
              href="/practice"
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
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [edit, setEdit] = useState(false);
  const [time, setTime] = useState();
  console.log(time);

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

  const handleMarkForReview = () => {
    const markedQuestions = [...markedForReview];
    if (!markedQuestions.includes(currentQuestion)) {
      markedQuestions.push(currentQuestion);
    } else {
      const index = markedQuestions.indexOf(currentQuestion);
      markedQuestions.splice(index, 1);
    }
    setMarkedForReview(markedQuestions);
  };
  return (
    <div className="h-screen">
      {!quizStart ? (
        <div className="flex flex-col justify-center items-center py-10 px-4">
          <h2 className="font-bold text-2xl mb-4">Welcome to the Quiz</h2>
          {edit ? (
            <div className="flex flex-col justify-center items-center">
              <h2>
                Challenge yourself by selecting number of questions you solved
                in fixed time
              </h2>
              <div className="w-72 px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Set Questions
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="10"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-72 px-3 mb-5">
                <label htmlFor="" className="text-xs font-semibold px-1">
                  Set Time
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="number"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-violet-500"
                    placeholder="10"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="bg-violet-400 w-72 px-4 py-2 rounded-lg hover:bg-violet-500"
                onClick={() => {
                  setQuizStart(true);
                  setMinutes(time - 1);
                }}
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <button
                className="bg-violet-400 w-72 px-4 py-2 mb-5 rounded-lg hover:bg-violet-500"
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
                  setEdit(true);
                }}
              >
                Set Time and Questions
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto p-6 w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
          </div>
          <div className="">
            {isQuizFinished ? (
              <div className="flex flex-col text-center items-center">
                <h2 className="text-xl font-bold mb-4">Quiz Completed</h2>
                <p className="mb-4">
                  Your score is {score}/{quizQuestions.length}
                </p>
                <Link
                  className="bg-violet-400 w-60 items-center px-4 py-2 rounded-lg hover:bg-violet-500"
                  href="/practice"
                >
                  Main Section
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-3/4 p-4">
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
                  <div>
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
                    <div className="mt-4">
                      <button
                        className={`px-4 py-2 rounded-md ${
                          markedForReview.includes(currentQuestion)
                            ? 'bg-orange-400 text-white'
                            : 'bg-gray-200 hover:bg-orange-100'
                        }`}
                        onClick={handleMarkForReview}
                      >
                        {markedForReview.includes(currentQuestion)
                          ? 'Marked for Review'
                          : 'Mark for Review'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/4 p-4">
                  <div className="text-center">
                    <p
                      className={`mb-4 font-bold text-3xl ${
                        minutes < 2 ? 'text-red-500' : 'text-green-400'
                      }`}
                    >
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  </div>
                  <div className="font-bold text-lg mb-4 text-center">
                    Question Status
                  </div>
                  <div className="p-4 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-2">
                    {quizQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className={`p-2 rounded-md cursor-pointer text-center ${
                          index === currentQuestion
                            ? 'bg-blue-200'
                            : markedForReview.includes(index)
                            ? 'bg-orange-400'
                            : 'bg-gray-100 hover:bg-blue-100'
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
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
