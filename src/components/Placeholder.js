import styles from "./Placeholder.module.css";

const Placeholder = ({className, style}) => {
    return (
        <span style={style} className={`${styles.placeholder} ${className}`}></span>
    );
};

export default Placeholder;