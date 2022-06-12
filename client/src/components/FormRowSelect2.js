const FormRowSelect2 = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='form-group'>
      <label className='col-form-label' htmlFor={name}>
        {labelText || name}
      </label>
      <select
        class='form-control mb-3'
        name={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect2;
