import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

function Dashboard() {
  return (
    <div>
      <AppBar username="Ram" logo="R" />
      <div className="m-8">
        <Balance balance={"10,000"} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
