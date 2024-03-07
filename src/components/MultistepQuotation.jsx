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

const data = [
  {
    service: "DISTRIBUTION BOX INSTALATION",
    questions: [
      {
        question: "Home voltage",
        options: [
          { option: "120V", custom: false },
          { option: "240v", custom: false },
          { option: "Both", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "How many do you need",
        options: [
          { option: "1", custom: false },
          { option: "2/3", custom: false },
          { option: "4/5", custom: false },
          { option: "More", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Is it any wiring pending in your home?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Do you need any breakers?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
    ],
  },

  {
    service: "NEW HOME WIRING",
    questions: [
      {
        question: "Home voltage",
        options: [
          { option: "120V", custom: false },
          { option: "240V", custom: false },
          { option: "Both", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Construction Ft²/m²",
        options: [
          { option: "300-500 Ft² / 90-150 m²", custom: false },
          { option: "500-700 Ft² / 150-210 m²", custom: false },
          { option: "700-900 Ft² / 210-280m²", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },

      {
        question: "Construction type?",
        options: [
          { option: "Concrete", custom: false },
          { option: "Wood", custom: false },
          { option: "Metal", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },
      {
        question: "Construction location?",
        type: "Open",
      },
    ],
  },

  {
    service: "HOME IMPROVEMENT WIRING",
    questions: [
      {
        question: "Home voltage",
        options: [
          { option: "120V", custom: false },
          { option: "240V", custom: false },
          { option: "Both", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Construction Ft²/m²",
        options: [
          { option: "300-500 Ft² / 90-150 m²", custom: false },
          { option: "500-700 Ft² / 150-210 m²", custom: false },
          { option: "700-900 Ft² / 210-280m²", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },

      {
        question: "Does the area have electrical outlets?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Do you require distribution box?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Construction type?",
        options: [
          { option: "Concrete", custom: false },
          { option: "Wood", custom: false },
          { option: "Metal", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },

      {
        question: "Construction location?",
        type: "Open",
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
    setAnswers([]);
  }, [service]);

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
    const { name, value } = e.target;

    if (name === "phone") {
      if (value === "" || /^[\d\+\-\(\)]+$/.test(value)) {
        setUserData((prev) => {
          return { ...prev, [name]: value };
        });
      }
    } else {
      setUserData((prev) => {
        return { ...prev, [name]: value };
      });
    }
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

  const {
    steps,
    step,
    currentStepIndex,
    back,
    next,
    isFirstStep,
    isLastStep,
    goToStart,
  } = useMultistepForm([
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
    goToStart();
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
              <div className="flex  items-start w-[40%] mx-auto h-[15px] mb-4 rounded-full bg-gray-200">
                <div
                  style={{
                    width:
                      (
                        (currentStepIndex / (steps.length - 1)) *
                        100
                      ).toFixed() + "%",
                  }}
                  className={`bg-gradient-to-r from-[#f7ba2c] to-[#ea5459] h-full rounded-full transition-all`}
                ></div>
              </div>
              {currentStepIndex !== 0 && (
                <p
                  onClick={goToStart}
                  className="text-center text-lg mx-auto w-fit text-blue-600 hover:text-blue-500 transition-colors mb-2 cursor-pointer"
                >
                  Return to services
                </p>
              )}

              {step}
              <div className="flex w-full justify-evenly mt-[30px]">
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
