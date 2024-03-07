import React from "react";
import FormWrapper from "./FormWrapper";

const ServiceSelection = ({ data, service, updateService }) => {
  return (
    <FormWrapper title={"Select a service"}>
      <ul>
        {data.map((object, index) => (
          <li key={object.service} className="mb-1">
            <label
              className="w-full gap-2 p-4 flex flex-row border-[1px] cursor-pointer rounded-md"
              htmlFor={object.service}
            >
              <input
                className="w-fit shadow-none"
                type="radio"
                id={object.service}
                name="test"
                checked={service === object.service}
                onChange={(e) => updateService(e.target.value)}
                value={object.service}
                required
              />
              <span className="text-lg text-black font-normal">
                {object.service}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </FormWrapper>
  );
};

export default ServiceSelection;
