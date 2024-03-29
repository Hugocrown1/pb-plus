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
import SpinnerSmall from "./SpinnerSmall";

const MultistepQuotation = ({ isMenuOpen, setIsMenuOpen, servicesData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [service, setService] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({
    name: session?.user.name || "",
    email: session?.user.email || "",
    phone: session?.user.phone || "",
  });
  const [quoteFinished, setQuoteFinished] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

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
      : servicesData[
          servicesData.findIndex((object) => object.service === service)
        ].questions;

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
      data={servicesData}
      service={service}
      updateService={setService}
    />,
    ...serviceForms,
    <ExtraInfoForm extraInfo={extraInfo} setExtraInfo={setExtraInfo} />,
    <UserInfoForm userData={userData} changeUserData={changeUserData} />,
  ]);

  const handleFormClose = () => {
    goToStart();
    setConfirmationModal(false);
    setIsLoading(false);
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
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed flex items-center inset-0  bg-zinc-950/30 transition-transform z-40 w-full ${
          !isMenuOpen && "invisible"
        } `}
      >
        <dialog className="flex flex-col w-full min-[817px]:w-[800px] h-full items-center min-[1276px]:h-fit min-h-[300px] bg-white rounded-lg pb-[40px]">
          <header className="w-full flex flex-col">
            <div className="w-full flex justify-end items-end py-2 px-3">
              <button
                className="text-gray"
                onClick={() => setConfirmationModal(true)}
              >
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
                  className={`bg-gradient-to-r from-[#f7ba2c] to-[#ea5459] h-full rounded-full`}
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
              <div className="flex flex-col min-[1276px]:flex-row w-full justify-evenly mt-[30px] px-6">
                {!isFirstStep && (
                  <button
                    disabled={isLoading}
                    type="button"
                    className="hidden min-[1276px]:flex justify-center px-4 py-3 my-auto rounded-2xl font-medium text-lg w-full min-[1276px]:w-[220px]  text-black transition-colors  border-2 border-black hover:bg-[#e7e7e7c2]  text-center"
                    onClick={back}
                  >
                    Previous
                  </button>
                )}
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex items-center justify-center px-4 py-3 my-2 rounded-2xl font-medium text-lg  w-full min-[1276px]:w-[220px] h-[56px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center disabled:bg-gray-400"
                >
                  {isLoading ? (
                    <SpinnerSmall />
                  ) : isLastStep && !isFirstStep ? (
                    "Submit"
                  ) : (
                    "Next"
                  )}
                </button>
                {!isFirstStep && (
                  <button
                    disabled={isLoading}
                    type="button"
                    className="flex min-[1276px]:hidden justify-center px-4 py-3 my-auto rounded-2xl font-medium text-lg w-full min-[1276px]:w-[220px]  text-black transition-colors  border-2 border-black hover:bg-[#e7e7e7c2]  text-center"
                    onClick={back}
                  >
                    Previous
                  </button>
                )}
              </div>
            </form>
          )}
        </dialog>
      </div>

      <div
        className={`fixed flex items-center inset-0  bg-zinc-950/30 transition-transform z-40 w-full ${
          !confirmationModal && "invisible"
        } `}
      >
        <dialog className="flex flex-col justify-evenly w-full  max-w-[600px] items-center h-[300px] bg-white rounded-lg px-6 py-[30px]">
          <h2 className="text-2xl font-semibold">
            Are you sure you want to exit?
          </h2>
          <div className="w-full flex flex-col justify-center items-center">
            <button
              className="flex  justify-center px-4 py-3 my-auto rounded-2xl font-medium text-lg w-full min-[1276px]:w-[220px]  text-black transition-colors  border-2 border-black hover:bg-[#e7e7e7c2]  text-center"
              onClick={handleFormClose}
            >
              Exit
            </button>
            <button
              className="flex items-center justify-center px-1 py-3 my-2 rounded-2xl font-medium text-lg  w-full min-[1276px]:w-[220px] h-[56px]  text-black transition-colors  bg-[#F6AA1C] hover:bg-[#ca9c47]  text-center disabled:bg-gray-400"
              onClick={() => setConfirmationModal(false)}
            >
              Continue requesting
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default MultistepQuotation;
