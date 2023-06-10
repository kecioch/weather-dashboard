import styles from "./Preview.module.css";
import PreviewDay from "./PreviewDay";

const Preview = ({ days }) => {
  const previewDays = days?.map((day, i) => <PreviewDay key={i} day={day} />);

  return <div className={styles.container}>{previewDays}</div>;
};

export default Preview;
