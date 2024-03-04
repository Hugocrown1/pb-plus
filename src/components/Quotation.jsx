"use client";
import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";

const items = [
  { value: "recentlyAdded", label: "Recently Added" },
  { value: "The Ejido", label: "The Ejido" },
  { value: "Bufadora", label: "Bufadora" },
  { value: "The Spit", label: "The Spit" },
  { value: "Maneadero", label: "Maneadero" },
];

const data = [
  {
    question: "Home voltage",
    options: ["120", "240", "Both"],
    moreInfo: true,
  },
  {
    question: "How many do you need",
    options: ["1", "2/3", "4/5", "More"],
    moreInfo: true,
  },
];

const Quotation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [quoteAnswers, setQuoteAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  const handleNextQuestion = () => {
    const answerObject = {
      question: question.question,
      answer: answer,
    };

    const updatedQuoteAnswers = [...quoteAnswers];
    updatedQuoteAnswers[index] = answerObject;

    setQuoteAnswers(updatedQuoteAnswers);

    if (index + 1 < data.length) {
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setAnswer(quoteAnswers[index + 1].answer);
    }
  };

  const handlePrevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
      setQuestion(data[index - 1]);
      setAnswer(quoteAnswers[index - 1].answer);
    }
  };

  const cancelQuote = () => {
    setIsMenuOpen(false),
      setIndex(0),
      setQuestion(data[0]),
      setQuoteAnswers([]);
    setAnswer("");
  };

  return (
    <>
      <button
        className="px-4 py-3 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center"
        onClick={() => setIsMenuOpen(true)}
      >
        Free Quote
      </button>
      <div
        className={`fixed flex items-center inset-0  bg-zinc-950/30 transition-transform z-40 w-full ${
          !isMenuOpen && "invisible"
        } `}
      >
        <dialog className="flex flex-col w-[800px] min-h-[400px] bg-white rounded-lg pb-[40px]">
          <header className="w-full flex flex-col mb-[40px]">
            <div className="w-full flex justify-end items-end p-2">
              <button className="text-gray" onClick={cancelQuote}>
                <IconX />
              </button>
            </div>
            <h2 className="text-2xl text-center px-2 font-semibold">
              {question.question}
            </h2>
          </header>
          <form className="px-2">
            <ul>
              {question.options.map((item) => (
                <li key={item} className="mb-1">
                  <label
                    className="w-full gap-2 p-4 flex flex-row border-2 cursor-pointer rounded-md"
                    htmlFor={item}
                  >
                    <input
                      className="w-fit shadow-none"
                      type="radio"
                      id={item}
                      name="test"
                      checked={answer === item}
                      onChange={(e) => setAnswer(e.target.value)}
                      value={item}
                    />
                    <span className="text-lg text-black font-normal">
                      {item}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex w-full justify-evenly mt-[40px]">
              {index > 0 && (
                <button
                  type="button"
                  className="px-4 py-3 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  border-2 border-black hover:bg-[#e7e7e7c2]  text-center"
                  onClick={handlePrevQuestion}
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                className="px-4 py-3 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center disabled:bg-gray-400"
                disabled={answer === ""}
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default Quotation;
