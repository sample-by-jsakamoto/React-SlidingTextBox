import styles from "./NormalTextBox.module.css";

export const NormalTextBox = ({ text }: { text: string }) => {
  return (
    <div className={styles.containerBox}>
      <div className={styles.contentBox}>{text}</div>
    </div>
  );
};
