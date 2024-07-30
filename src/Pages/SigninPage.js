import { useAuth } from "contexts/auth-contexts";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import InputPasswordToggle from "components/input/InputPasswordToggle";
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const SigninPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSignin = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  useEffect(() => {
    const ArrayErrors = Object.values(errors);
    if (ArrayErrors.length > 0) {
      toast.error(ArrayErrors[0].message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <AuthenticationPage>
      {" "}
      <form
        className="form"
        onSubmit={handleSubmit(handleSignin)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email" className="label">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            //   className="input"
            placeholder="Enter your email"
            control={control}
            hasIcon
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Have you had an account yet?{" "}
          <NavLink to={"/sign-up"}>Register</NavLink>
        </div>
        <Button
          kind="primary"
          type="submit"
          style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Login
          {/* <LoadingSpinner></LoadingSpinner> */}
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SigninPage;
