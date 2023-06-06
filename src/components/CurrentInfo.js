import styles from "./CurrentInfo.module.css";
import Details from "./Details";
import Location from "./Location";
import Current from "./Current";

const CurrentInfo = ({ data }) => {
  return (
    <div className={styles.container}>
      <Location data={data?.location} />
      <Current data={data} />
      <Details data={data} />
    </div>
  );
};

export default CurrentInfo;
