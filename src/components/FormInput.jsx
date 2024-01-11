const FormInput = (props) => {
  const { label, errorMessage, onChange, ...inputProps } = props;
  return (
    <div className="form-input">
      <label htmlFor={inputProps.id}>{label}</label>
      <input {...inputProps} onChange={onChange} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
