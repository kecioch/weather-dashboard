import styles from "./CustomTooltip.module.css";

const CustomTooltip = ({ payload, label, unit }) => {
  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label?.substr(11)}</p>
      <p className={styles.item}>{`${payload && payload[0]?.value}${unit}`}</p>
    </div>
  );
};

export default CustomTooltip;
