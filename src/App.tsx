import React from "react";
import "./App.css";
import { FieldValues, useForm } from "react-hook-form";

type Login = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    criteriaMode: "all",
    defaultValues: { email: "test@example.com", password: "test" },
    reValidateMode: "onBlur",
  });
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", { required: "入力が必須の項目です。" })}
          />
          {errors.email?.message && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password", {
              required: { value: true, message: "入力が必須の項目です。" },
              pattern: {
                value: new RegExp(/^[A-Za-z]+$/),
                message: "アルファベットのみ入力してください。",
              },
              minLength: { value: 8, message: "8文字以上入力してください。" },
            })}
            type="password"
          />
          {errors.password?.types?.required && (
            <div>{errors.password.types.required}</div>
          )}
          {errors.password?.types?.minLength && (
            <div>{errors.password.types.minLength}</div>
          )}
          {errors.password?.types?.pattern && (
            <div>{errors.password.types.pattern}</div>
          )}
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default App;
