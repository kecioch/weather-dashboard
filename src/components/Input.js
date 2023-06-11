import styles from "./Input.module.css";

const Input = ({
  placeholder,
  children,
  id,
  onKeyDown,
  value,
  onChange,
  loading,
  className,
}) => {
  const classes = `${styles.group} ${className}`;

  return (
    <div className={classes}>
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}></div>
        </div>
      )}
      <input
        className={styles.input}
        id={id}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        disabled={loading}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default Input;
