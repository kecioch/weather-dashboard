import styles from "./Location.module.css";

const Location = ({ data }) => {
  return (
    <div className={styles.container}>
      <p>{data}</p>
    </div>
  );
};

export default Location;
