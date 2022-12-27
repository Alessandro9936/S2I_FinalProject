import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import InputText from "../../../components/Input/input-text";
import { useLogin } from "../../../services/user-services";
import { LoginFormType } from "./types/types";
import LoginSchema from "./utils/validation-schema";

const LoginForm = () => {
  const initialValues = { email: "", password: "" };

  const { control, handleSubmit, setError } = useForm<LoginFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(LoginSchema),
  });

  const { login, isLoading } = useLogin();

  const onSubmit = (formData: LoginFormType) => {
    login(formData, setError);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-2/4 left-2/4 flex w-screen -translate-x-2/4 -translate-y-2/4 flex-col gap-y-6 p-4 px-8 md:w-fit md:px-0"
    >
      <h1 className="mb-2 text-3xl font-bold">Login in to your account</h1>
      <InputText
        type="email"
        name="email"
        label="Email"
        placeholder="johndoe@example.com"
        control={control}
      />
      <InputText
        type="password"
        name="password"
        label="Password"
        control={control}
      />
      <SubmitButton label="Login" isLoading={isLoading} />
      <p className="-mt-2 text-center text-sm md:text-left">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="underline transition-colors hover:text-purple-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;