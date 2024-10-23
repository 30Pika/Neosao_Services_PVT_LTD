import React, { useState } from "react";
import { Button, Input, StyledText, Title } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { guestLogin, login } from "../features/loginFeature";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function LogIn() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [btnLoad, setBtnLoad] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = () => {
    setBtnLoad(true);
    axios
      .post("http://localhost:5000/Task/api/login", formData)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, { position: "top-right" });
          // dispatch(login(res.data.user));
          Cookies.set("authToken", res.data.token);

        }

      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed", {
          position: "top-right",
        });
      })
      .finally(() => {
        setBtnLoad(false);
        if (Cookies.get("authToken")) {
          // navigate("/app/transactions");
          window.location.href = "/app/transactions"
        }
      });
  };

  return (
    <div className="pb-14">
      <Title>
        Welcome!{" "}
        <StyledText className="text-5xl tracking-wide sm:text-3xl ">
          Log in
        </StyledText>{" "}
        to continue
      </Title>
      <div className="flex flex-col items-center gap-6 justify-center mt-8">
        <div className="p-px rounded-lg bg-gradient-to-br from-purple-400 via-slate-700 to-purple-400">
          <form
            className="rounded-lg bg-slate-900/90 px-6 py-4 w-96 sm:w-80"
            onSubmit={handleSubmit(submit)}
          >
            <Input
              {...register("email")}
              name="email"
              required
              label="E-mail:"
              type="email"
              className="mb-3"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              {...register("password")}
              name="password"
              required
              label="Password:"
              type="password"
              className="mb-3"
              value={formData.password}
              onChange={handleInputChange}
            />
            <p className="p-1 text-right">
              Don't have an Account?{" "}
              <Link
                to="/app/signup"
                className="hover:border-b-2 border-b-purple-300 text-purple-200 font-semibold text-lg"
              >
                Sign-up
              </Link>
            </p>
            <Button className="w-full my-3" type="submit" isLoading={btnLoad}>
              Log-in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
