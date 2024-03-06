"use client";
import useMultistepForm from "@/hooks/useMultistepForm";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import ServiceForm from "./QuotationForms/ServiceForm";
import ServiceSelection from "./QuotationForms/ServiceSelection";
import ExtraInfoForm from "./QuotationForms/ExtraInfoForm";
import UserInfoForm from "./QuotationForms/UserInfoForm";
import { useSession } from "next-auth/react";
import axios from "axios";

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
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [service, setService] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({
    name: session?.user.name || "",
    email: session?.user.email || "",
    phone: session?.user.phone || "",
  });
  const [quoteFinished, setQuoteFinished] = useState(false);

  useEffect(() => {
    if (session) {
      setUserData({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      });
    }
  }, [session]);

  const changeUserData = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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
      <UserInfoForm userData={userData} changeUserData={changeUserData} />,
    ]);

  const handleFormClose = () => {
    closeForm();
    setIsMenuOpen(false);
    setQuoteFinished(false);
    setUserData({
      name: session?.user.name || "",
      email: session?.user.email || "",
      phone: session?.user.phone || "",
    });
    setExtraInfo("");
    setAnswers([]);
    setService("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    next();

    if (isLastStep) {
      const { name, email, phone } = userData;
      const quotation = {
        userName: name,
        userEmail: email,
        userPhone: phone,
        serviceName: service,
        extraInfo: extraInfo,
        responses: answers,
      };

      await axios.post("/api/prices", quotation);
      setQuoteFinished(true);
    }
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
          {quoteFinished ? (
            <div className="flex flex-col items-center h-full justify-stretch px-2 mt-[40px]">
              <IconCheck size={90} />
              <h2>Thanks for your time</h2>
              <p>We will contact as soon as posible!</p>
              <button
                className="px-4 py-3 mt-4 my-auto rounded-2xl font-medium text-lg w-[220px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center disabled:bg-gray-400"
                onClick={handleFormClose}
              >
                Dismiss
              </button>
            </div>
          ) : (
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
          )}
        </dialog>
      </div>
    </>
  );
};

export default MultistepQuotation;
