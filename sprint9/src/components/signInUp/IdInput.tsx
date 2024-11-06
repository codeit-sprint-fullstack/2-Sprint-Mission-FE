import { useFormContext } from "react-hook-form";
import style from "@/src/styles/signInUp/SignInput.module.css";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder: string;
  validations: object;
  type: string;
}

export default function SignUpInInput({
  name,
  label,
  placeholder,
  validations,
  type
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
    trigger
  } = useFormContext();

  const addError = errors[name] ? `${style.error} ` : ``;
  const text = (label && placeholder) || `${label}${placeholder}`;

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <div className={`${style.inputContainer} ${addError}`}>
        <input
          className={style.input}
          {...register(name, {
            ...validations,
            onBlur: () => trigger(name),
            onChange: () => trigger(name)
          })}
          placeholder={label ? text : placeholder}
          type={type}
        />
      </div>
      {errors && errors[name] && (
        <span className={style.errorMessage}>
          {typeof errors[name]?.message === "string"
            ? errors[name]?.message
            : ""}
        </span>
      )}
    </div>
  );
}
