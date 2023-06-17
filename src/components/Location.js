import styles from "./Location.module.css";
import { GeoAlt } from "react-bootstrap-icons";
import Placeholder from "./Placeholder";

const Location = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading && (
        <Placeholder style={{width: "auto"}} />
      )}
      {!isLoading && (
        <p>
          <GeoAlt /> {data}
        </p>
      )}
    </div>
  );
};

export default Location;
