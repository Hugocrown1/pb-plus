import React from "react";
import FormWrapper from "./FormWrapper";

const ServiceForm = ({ question, answer, updateAnswer }) => {
  return (
    <FormWrapper title={question.question}>
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
                required
                checked={answer === item}
                onChange={(e) => updateAnswer(e.target.value)}
                value={item}
              />
              <span className="text-lg text-black font-normal">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </FormWrapper>
  );
};

export default ServiceForm;
