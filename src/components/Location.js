import { GeoAlt } from "react-bootstrap-icons";
import styles from "./Location.module.css";

const Location = ({ data }) => {
  return (
    <div className={styles.container}>
      <p>
        <GeoAlt /> {data}
      </p>
    </div>
  );
};

export default Location;
