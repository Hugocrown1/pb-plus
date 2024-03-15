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
                    className="w-full gap-2 p-3 flex flex-row border-[1px] cursor-pointer rounded-md"
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
                    className="items-center w-full gap-2 px-4 py-2 flex flex-row border-[1px] cursor-pointer rounded-md"
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
                      className="font-medium text-lg"
                      type="text"
                      placeholder="Provide more info..."
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
            className="h-[150px] font-medium"
            maxLength={200}
            id="information"
            name="information"
            placeholder="Write your answer"
            required
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
