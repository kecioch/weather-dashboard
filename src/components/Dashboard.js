import { useState } from "react";
import styles from "./Dashboard.module.css";
import CurrentInfo from "./CurrentInfo";
import SideInfo from "./SideInfo";

const Dashboard = ({ data }) => {
  console.log("DASHBOARD DATA", data);
  const [currData, setCurrDat] = useState();

  return (
    <div className={styles.dashboard}>
      <CurrentInfo />
      <SideInfo />
    </div>
  );
};

export default Dashboard;
