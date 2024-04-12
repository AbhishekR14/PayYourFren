import { useState } from "react";
import { Button } from "./Button";
import React from "react";
import axios from "axios";

export function Users(props) {
  const [filter, setFilter] = React.useState("");
  const [users, setUsers] = useState([]);
  React.useEffect(
    function () {
      async function getusers() {
        let urltocall = "";
        if (filter == "") {
          urltocall = "https://payyourfren.onrender.com/api/v1/user/bulk";
        } else {
          urltocall =
            "https://payyourfren.onrender.com/api/v1/user/bulk?filter=" +
            filter;
        }
        const res = await axios.get(urltocall, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        });
        setUsers(res.data.users);
      }
      getusers();
    },
    [filter]
  );
  return (
    <div>
      <div className="font-bold">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].ToUpper() + user.lastName[0].ToUpper()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
