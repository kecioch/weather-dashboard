import styles from "./Preview.module.css";
import PreviewDay from "./PreviewDay";

const Preview = ({ days, isLoading }) => {
  const previewDays = days?.map((day, i) => (
    <PreviewDay key={i} day={day} isLoading={isLoading} />
  ));

  return (
    <div className={styles.container}>
      {!isLoading && previewDays}
      {isLoading && (
        <>
          <PreviewDay isLoading={true} />
          <PreviewDay isLoading={true} />
          <PreviewDay isLoading={true} />
          <PreviewDay isLoading={true} />
          <PreviewDay isLoading={true} />
        </>
      )}
    </div>
  );
};

export default Preview;
