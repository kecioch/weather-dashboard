import styles from "./SideInfo.module.css";

const SideInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.day}></div>
      <div className={styles.preview}></div>
    </div>
  );
};

export default SideInfo;
