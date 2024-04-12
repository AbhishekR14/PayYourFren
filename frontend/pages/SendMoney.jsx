import axios from "axios";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
  const [amount, setAmount] = React.useState(0);
  const [resMessage, setResMessage] = React.useState("");
  const [transcationStatus, setTranscationStatus] = React.useState(false);
  const [seachParams] = useSearchParams();
  const id = seachParams.get("id");
  const firstname = seachParams.get("firstname");
  const lastname = seachParams.get("lastname");
  const navigate = useNavigate();
  var body = {
    amount: amount,
    to: id,
  };
  return (
    <div class="flex justify-center h-dvh bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div class="border h-min text-card-foreground max-w-md p-4 bg-white shadow-lg rounded-lg">
          <div class="flex flex-col space-y-1.5 p-6">
            <h2 class="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-center space-x-4">
              <div className="rounded-full h-12 w-16 bg-green-400 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                  {firstname[0].toUpperCase()}
                  {lastname[0].toUpperCase()}
                </div>
              </div>
              <div className="h-12 w-full flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                  {firstname}
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  onChange={(event) => {
                    setAmount(parseFloat(event.target.value));
                  }}
                />
              </div>
              <div>{resMessage}</div>
              <button
                class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                onClick={async () => {
                  const res = await axios.post(
                    "https://payyourfren.onrender.com/api/v1/account/transfer",
                    body,
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("authToken"),
                      },
                    }
                  );
                  if (res.status == 200) {
                    setTranscationStatus(true);
                    setResMessage(res.data.message);
                  } else if (res.status == 400) {
                    setResMessage(res.data.message);
                  }
                }}
              >
                Initiate Transfer
              </button>
              <button
                class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-800 text-white"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
