import React, { useState } from "react";
import { Button, Input, StyledText, Title } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

function SignUp() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const [btnLoad, setBtnLoad] = useState(false);

  // Form submit handler with promises
  const submit = (data) => {
    setBtnLoad(true);
    axios.post("http://localhost:5000/Task/api/register", data)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, { position: "top-right" });
          navigate("/app/login");
          reset();
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to sign up", {
          position: "top-right",
        });
      })
      .finally(() => {
        setBtnLoad(false);
      });
  };

  return (
    <div className="pb-14">
      <Title>
        Sign up to{" "}
        <StyledText className="text-5xl tracking-wide sm:text-3xl">
          Explore
        </StyledText>{" "}
        more
      </Title>
      <div className="flex justify-center mt-8">
        <div className="p-px rounded-lg bg-gradient-to-br from-purple-400 via-slate-700 to-purple-400">
          <form
            className="rounded-lg bg-slate-900/90 px-6 py-4 w-96 sm:w-80"
            onSubmit={handleSubmit(submit)}
          >
            <Input
              label="Name:"
              className="mb-3"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />
            <Input
              label="E-mail:"
              className="mb-3"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              label="Password:"
              type="password"
              className="mb-3"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <p className="p-1 text-right">
              Already have an Account?{" "}
              <Link
                to="/app/login"
                className="hover:border-b-2 border-b-purple-300 text-purple-200 font-semibold text-lg"
              >
                Log-in
              </Link>
            </p>
            <Button type="submit" className="w-full my-3" isLoading={btnLoad}>
              {btnLoad ? "Signing Up..." : "Sign-up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
