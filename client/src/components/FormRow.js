const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    // <div className='form-row'>
    //   <label htmlFor={name} className='form-label'>
    //     {labelText || name}
    //   </label>
    //   <input
    //     type={type}
    //     value={value}
    //     name={name}
    //     onChange={handleChange}
    //     className='form-input'
    //   />
    // </div>

    <div className='form-group mb-3'>
      <label htmlFor={name}>{labelText || name}</label>
      <div className='input-group'>
        <input
          value={value}
          name={name}
          type={type}
          onChange={handleChange}
          className='form-control form-control-lg'
        />
      </div>
    </div>
  );
};
export default FormRow;
