import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

function signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signinSuccess, setsigninSuccess] = React.useState(false);
  const [signinError, setsigninError] = React.useState("");
  const [loading, setLoading] = React.useState("");
  /*React.useEffect(function () {
    async function Awake() {
      try {
        const response = await axios.get(
          "https://pay-your-fren.vercel.app/api/v1/wakeup"
        );
      } catch (e) {}
    }
    Awake();
  }, []);*/
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
                try {
                  setLoading("Validating, Please wait...");
                  setsigninError("");
                  const res = await axios.post(
                    "https://pay-your-fren.vercel.app/api/v1/user/signup",
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
                } catch (e) {
                  setsigninError(e.response.data.message + ". Try again!");
                } finally {
                  setLoading("");
                }
              }}
            />
          </div>
          {loading != "" && <BottomWarning label={loading} />}
          {signinError != "" && <BottomWarning label={signinError} />}
          {signinSuccess == true && (
            <BottomWarning
              label={"User created successfully! Go to"}
              buttonText={"Dashboard"}
              onClick={async () => {
                try {
                  setLoading("Validating, Please wait...");
                  const res = await axios.get(
                    "https://pay-your-fren.vercel.app/api/v1/user/getusername",
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("authToken"),
                      },
                    }
                  );
                  if (res.status == 200) {
                    navigate("/dashboard");
                  } else {
                    alert("Please Sign In!");
                  }
                } catch (e) {
                  alert("Please Sign In");
                } finally {
                  setLoading("");
                }
              }}
            />
          )}
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default signup;
