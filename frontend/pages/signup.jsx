import React from "react";
import axios from "axios";
import { Heading } from "../components/heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

function signup() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signinSuccess, setsigninSuccess] = React.useState(false);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your infromation to create an account"} />
          <Inputbox
            placeholder="John"
            label={"First Name"}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <Inputbox
            placeholder="Doe"
            label={"Last Name"}
            onChange={(event) => {
              setlastName(event.target.value);
            }}
          />
          <Inputbox
            placeholder="Sample@gmail.com"
            label={"Email"}
            onChange={(event) => {
              setEmailId(event.target.value);
            }}
          />
          <Inputbox
            placeholder="123456Abc"
            label={"Password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const res = await axios.post(
                  "https://payyourfren.onrender.com/api/v1/user/signup",
                  {
                    username: emailId,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                  }
                );
                localStorage.setItem("authToken", res.data.token);
                if (res.data.message === "User created successfully") {
                  setsigninSuccess(true);
                }
              }}
            />
          </div>
          {signinSuccess == true && (
            <BottomWarning
              label={"User created successfully! Please"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          )}
          {signinSuccess == false && (
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default signup;
