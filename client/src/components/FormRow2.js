const FormRow = ({ type, name, value, handleChange, labelText, readonly }) => {
  return (
    <div className='form-group'>
      <label className='col-form-label' htmlFor={name}>
        {labelText || name}
      </label>
      <input
        value={value}
        name={name}
        type={type}
        onChange={handleChange}
        className='form-control'
        id='formGroupExampleInput'
        readOnly={readonly}
        // placeholder
      />
    </div>
  );
};
export default FormRow;
