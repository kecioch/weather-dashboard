import DayDiagramm from "./DayDiagramm";
import Preview from "./Preview";
import styles from "./SideInfo.module.css";

const SideInfo = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      <DayDiagramm data={data?.day} isLoading={isLoading} />
      <Preview days={data?.preview.days} isLoading={isLoading} />
    </div>
  );
};

export default SideInfo;
