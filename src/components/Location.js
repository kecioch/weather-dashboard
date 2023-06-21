import styles from "./Location.module.css";
import { GeoAlt } from "react-bootstrap-icons";
import Placeholder from "./Placeholder";
import Container from "./Container";

const Location = ({ data, isLoading }) => {
  return (
    <Container className={styles.container}>
      {isLoading && (
        <Placeholder style={{width: "auto"}} />
      )}
      {!isLoading && (
        <p>
          <GeoAlt /> {data}
        </p>
      )}
    </Container>
  );
};

export default Location;
