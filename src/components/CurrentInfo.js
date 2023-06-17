import styles from "./CurrentInfo.module.css";
import Details from "./Details";
import Location from "./Location";
import Current from "./Current";

const CurrentInfo = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      <Location data={data?.location} isLoading={isLoading} />
      <Current data={data} isLoading={isLoading} />
      <Details data={data} isLoading={isLoading} />
    </div>
  );
};

export default CurrentInfo;
