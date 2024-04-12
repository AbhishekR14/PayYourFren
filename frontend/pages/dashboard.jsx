import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import React from "react";

function costToTwoDecimals(cost) {
  return cost.toFixed(2);
}

function Dashboard() {
  const [firstname, setFirstname] = React.useState("");
  const [logoname, setLogoname] = React.useState("");
  const [balance, setBalance] = React.useState("");
  React.useEffect(function () {
    async function getinfo() {
      const res = await axios.get(
        "https://payyourfren.onrender.com/api/v1/user/getusername",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      setFirstname(res.data.firstname);
      setLogoname(res.data.firstname[0] + res.data.lastname[0]);
    }
    getinfo();
  }, []);
  React.useEffect(function () {
    async function getbalance() {
      const res = await axios.get(
        "https://payyourfren.onrender.com/api/v1/account/balance",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      setBalance(costToTwoDecimals(res.data.balance));
    }
    getbalance();
  }, []);
  return (
    <div>
      <AppBar username={firstname} logo={logoname} />
      <div className="m-8">
        <Balance balance={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
