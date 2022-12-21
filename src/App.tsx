import React from "react";
import "./App.css";
import { FieldValues, useForm } from "react-hook-form";

type Login = {
  email: string;
  password: string;
  showAge: boolean;
  age: number;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<Login>({
    criteriaMode: "all",
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const watchShowAge = watch("showAge", false);
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
        <div>
          <label htmlFor="age">Age</label>
        </div>
        <div>
          <input type="checkbox" {...register("showAge")} />
        </div>
        {watchShowAge && (
          <div>
            <input
              type="number"
              {...register("age", {
                min: { value: 50, message: "50以上を入力してください。" },
              })}
            />
            {errors.age?.message && <div>{errors.age.message}</div>}
          </div>
        )}
        <button type="submit" disabled={!isDirty || !isValid}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default App;
