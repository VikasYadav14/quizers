import React, { useState } from "react";

const AddQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label
          className="block font-medium text-sm text-gray-700 mb-2"
          htmlFor="question"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-sm text-gray-700 mb-2"
          htmlFor="options"
        >
          Options
        </label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            id={`option-${index}`}
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
            className="w-full border border-gray-400 p-2 rounded-lg mb-2"
          />
        ))}
      </div>

      <div className="mb-4">
        <label
          className="block font-medium text-sm text-gray-700 mb-2"
          htmlFor="answer"
        >
          Answer
        </label>
        <input
          type="text"
          id="answer"
          value={answer}
          onChange={handleAnswerChange}
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 active:text-white transition duration-150 ease-in-out"
        >
          Add Question
        </button>
      </div>
    </form>
  );
};

export default AddQuestionForm;
