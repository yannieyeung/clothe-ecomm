import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label ? (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      ) : null}
    </Group>

    //   <div className="group">
    //     <input className="form-input"
    //       {...otherProps}
    //     />
    //   {label ? <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label> : null}
    // </div>
  );
};

export default FormInput;
