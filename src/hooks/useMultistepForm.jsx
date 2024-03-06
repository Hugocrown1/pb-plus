import React, { useState } from "react";

const useMultistepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) return prev;
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goTo = (index) => {
    setCurrentStepIndex(index);
  };

  const closeForm = () => {
    setCurrentStepIndex(0);
  };
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    steps,
    next,
    goTo,
    back,
    closeForm,
  };
};

export default useMultistepForm;
