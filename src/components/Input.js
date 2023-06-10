import styles from "./Input.module.css";

const Input = ({ placeholder, children, id, onKeyDown, value, onChange }) => {
  return (
    <div className={styles.group}>
      <input
        className={styles.input}
        id={id}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default Input;
