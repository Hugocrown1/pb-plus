import React, { useState } from "react";
import FormWrapper from "./FormWrapper";

const ServiceForm = ({ question, answer, updateAnswer }) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    updateAnswer(value);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    updateAnswer(e.target.value);
  };
  return (
    <FormWrapper title={question.question}>
      {question.type === "Radio" && (
        <ul>
          {question.options.map((item) => {
            if (!item.custom) {
              return (
                <li key={item.option} className="mb-1">
                  <label
                    className="w-full gap-2 p-4 flex flex-row border-2 cursor-pointer rounded-md"
                    htmlFor={item.option}
                  >
                    <input
                      className="w-fit shadow-none"
                      type="radio"
                      id={item.option}
                      name="test"
                      required
                      checked={answer === item.option && !checked}
                      onChange={(e) => {
                        updateAnswer(e.target.value), setChecked(false);
                      }}
                      value={item.option}
                    />
                    <span className="text-lg text-black font-normal">
                      {item.option}
                    </span>
                  </label>
                </li>
              );
            } else {
              return (
                <li key={item.option} className="mb-1">
                  <label
                    className="w-full gap-2 p-4 flex flex-row border-2 cursor-pointer rounded-md"
                    htmlFor={item.option}
                  >
                    <input
                      className="w-fit shadow-none"
                      type="radio"
                      id={item.option}
                      name="test"
                      required
                      checked={checked}
                      onChange={handleCheck}
                    />
                    <span className="text-lg text-black font-normal">
                      {item.option}
                    </span>

                    <input
                      type="text"
                      placeholder="Enter custom value"
                      disabled={!checked}
                      required
                      value={value}
                      onChange={handleInputChange}
                    />
                  </label>
                </li>
              );
            }
          })}
        </ul>
      )}
      {question.type === "Open" && (
        <div className="form-input">
          <textarea
            className="h-[150px]"
            maxLength={200}
            id="information"
            name="information"
            placeholder="Write your answer"
            value={answer}
            onChange={(e) => {
              updateAnswer(e.target.value);
            }}
          ></textarea>
        </div>
      )}
    </FormWrapper>
  );
};

export default ServiceForm;
