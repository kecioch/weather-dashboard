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
  onFocus,
  onBlur,
}) => {
  const classes = `${styles.group} ${className}`;

  return (
    <div className={classes}>
      {loading && (
        <div className={styles.loadingContainer}>
          <div
            className={`${styles.loading} ${
              loading === "userLocation" && styles.loadingUserLocation
            }`}
          ></div>
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
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default Input;
