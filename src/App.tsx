import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup
    .string()
    .email("メールアドレスの形式ではありません。")
    .required("入力が必須の項目です。"),
  password: yup
    .string()
    .min(8, "8文字以上入力してください。")
    .required("入力が必須の項目です。"),
  showAge: yup.boolean(),
  age: yup.number().min(50, "50以上を入力してください。"),
});

type Login = yup.InferType<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Login>({
    resolver: yupResolver(schema),
  });
  const watchShowAge = watch("showAge", false);
  const onSubmit = (data: Login) => console.log(data);

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email", { required: true })} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...register("password")} type="password" />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="age">Age</label>
        </div>
        <div>
          <input type="checkbox" {...register("showAge")} />
        </div>
        {watchShowAge && (
          <div>
            <input type="number" {...register("age")} />
            <p>{errors.age?.message}</p>
          </div>
        )}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default App;
