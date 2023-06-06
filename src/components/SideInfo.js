import DayDiagramm from "./DayDiagramm";
import Preview from "./Preview";
import styles from "./SideInfo.module.css";

const SideInfo = ({ data }) => {
  return (
    <div className={styles.container}>
      <DayDiagramm data={data.day.chartData} />
      <Preview days={data?.preview.days} />
    </div>
  );
};

export default SideInfo;
