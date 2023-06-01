import styles from "./taskList.module.scss";

export default function TaskList() {
  return (
    <div>
      <h2 className={styles.title}>Hoàn thành</h2>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <input type="checkbox" />
          <span className={styles.taskName}>Hoc bai</span>
          <div className={styles.taskActions}>
            <button className={styles.taskAction}>🖊</button>
            <button className={styles.taskAction}>🗑</button>
          </div>
        </div>
      </div>
    </div>
  );
}
