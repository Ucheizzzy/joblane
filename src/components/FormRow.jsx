const FormRow = ({ name, type, value, labelText, handleChange }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        name={name}
        type={type}
        id={name}
        className='form-input'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormRow
