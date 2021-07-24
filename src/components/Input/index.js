import {StyledInputWrapper} from "./styles";

const Input = (props) => {
const { type = 'text', value = '', placeholder = '', required = false, onChange = () => {}, error, name, className } = props;
  return (
    <StyledInputWrapper className={className}>
      <input
        type={type}
        name={name}
        id='custom-input'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {!!error && <p className="error">{error}</p>}
    </StyledInputWrapper>
  )
}

export default Input;