"use client";
import useMultistepForm from "@/hooks/useMultistepForm";
import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import ServiceForm from "./QuotationForms/ServiceForm";
import ServiceSelection from "./QuotationForms/ServiceSelection";
import ExtraInfoForm from "./QuotationForms/ExtraInfoForm";
import UserInfoForm from "./QuotationForms/UserInfoForm";

const question = {
  question: "Home voltage",
  options: ["120", "240", "Both"],
};

const question2 = {
  question: "Home Height",
  options: ["121", "242", "Both"],
};

// [
//   <ServiceForm
//     question={question}
//     answer={answer}
//     updateAnswer={setAnswer}
//   />,
//   <ServiceForm
//     question={question2}
//     answer={answer}
//     updateAnswer={setAnswer}
//   />,
// ]

const data = [
  {
    service: "DISTRIBUTION BOX INSTALATION",
    questions: [
      {
        question: "Home voltage",
        options: ["120", "240", "Both"],
      },
      {
        question: "How many do you need",
        options: ["1", "2/3", "4/5", "More"],
      },
    ],
  },

  {
    service: "NEW HOME HIRING",
    questions: [
      {
        question: "Home voltage",
        options: ["120", "240", "Both"],
        moreInfo: true,
      },
      {
        question: "Construction Ft²/m²",
        options: [
          "300-500 Ft² / 90-150 m²",
          "500-700 Ft² / 150-210 m²",
          "700-900 Ft² / 210-280m²",
          "OTHER",
        ],
        moreInfo: true,
      },
    ],
  },
];

const MultistepQuotation = () => {
  const [service, setService] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });

  const handleUpdateAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = {
      question: serviceQuestions[index].question,
      answer,
    };
    setAnswers(updatedAnswers);
  };

  const serviceQuestions =
    service === ""
      ? []
      : data[data.findIndex((object) => object.service === service)].questions;

  const serviceForms = serviceQuestions.map((question, index) => (
    <ServiceForm
      key={index}
      question={question}
      answer={answers[index] ? answers[index].answer : ""}
      updateAnswer={(answer) => handleUpdateAnswer(index, answer)}
    />
  ));

  const { steps, step, back, next, isFirstStep, isLastStep, closeForm } =
    useMultistepForm([
      <ServiceSelection
        data={data}
        service={service}
        updateService={setService}
      />,
      ...serviceForms,
      <ExtraInfoForm extraInfo={extraInfo} setExtraInfo={setExtraInfo} />,
      <UserInfoForm />,
    ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFormClose = () => {
    closeForm();
    setIsMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next();
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
          <header className="w-full flex flex-col">
            <div className="w-full flex justify-end items-end p-2">
              <button className="text-gray" onClick={handleFormClose}>
                <IconX />
              </button>
            </div>
          </header>
          <form onSubmit={handleSubmit}>
            {step}
            <div className="flex w-full justify-evenly mt-[40px]">
              {!isFirstStep && (
                <button
                  type="button"
                  className="px-4 py-3 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  border-2 border-black hover:bg-[#e7e7e7c2]  text-center"
                  onClick={back}
                >
                  Previous
                </button>
              )}

              <button
                type="submit"
                className="px-4 py-3 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center disabled:bg-gray-400"
              >
                {isLastStep && !isFirstStep ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default MultistepQuotation;
