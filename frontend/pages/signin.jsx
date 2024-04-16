import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

function signin() {
  const navigate = useNavigate();
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signinFailed, setsigninFailed] = React.useState("No");
  const [loading, setLoading] = React.useState("");
  React.useEffect(function () {
    async function Awake() {
      try {
        const response = await axios.get(
          "https://pay-your-fren.vercel.app/api/v1/wakeup"
        );
      } catch (e) {}
    }
    Awake();
  }, []);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Subheading label={"Enter your credentials to access your account"} />
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
              label={"Sign in"}
              onClick={async () => {
                try {
                  setLoading("Validating, Please wait...");
                  const res = await axios.post(
                    "https://pay-your-fren.vercel.app/api/v1/user/signin",
                    {
                      username: emailId,
                      password: password,
                    }
                  );
                  localStorage.setItem("authToken", res.data.token);
                  if (res.status == 200) {
                    navigate("/dashboard");
                  }
                } catch (err) {
                  setsigninFailed("Yes");
                } finally {
                  setLoading("");
                }
              }}
            />
          </div>
          {loading != "" && <BottomWarning label={loading} />}
          {signinFailed === "Yes" && <BottomWarning label={"Try Again!"} />}
          <BottomWarning
            label={"Already signed in before?"}
            buttonText={"Try One Click Signin"}
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
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default signin;
