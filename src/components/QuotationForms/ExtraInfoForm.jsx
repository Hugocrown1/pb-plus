import React from "react";
import FormWrapper from "./FormWrapper";

const ExtraInfoForm = ({ extraInfo, setExtraInfo }) => {
  return (
    <FormWrapper title={"Would you like to provide more information?"}>
      <div className="form-input">
        <textarea
          className="h-[150px]"
          maxLength={200}
          id="information"
          name="information"
          placeholder="Something we should know?..."
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        ></textarea>
      </div>
    </FormWrapper>
  );
};

export default ExtraInfoForm;
