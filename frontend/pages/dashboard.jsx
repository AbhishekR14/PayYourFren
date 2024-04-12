import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function costToTwoDecimals(cost) {
  return cost.toFixed(2);
}

function Dashboard() {
  const [firstname, setFirstname] = React.useState("");
  const [logoname, setLogoname] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [notSignedIn, setNotSignedIn] = React.useState(true);
  const navigate = useNavigate();
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
      if (res.status == 200) {
        setNotSignedIn(false);
      }
      setFirstname(res.data.firstname);
      setLogoname(
        res.data.firstname[0].toUpperCase() + res.data.lastname[0].toUpperCase()
      );
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

  React.useEffect(() => {
    if (notSignedIn) {
      alert("Please Sign in");
      navigate("/signin");
    }
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
