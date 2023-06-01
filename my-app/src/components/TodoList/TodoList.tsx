import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";

export default function todoList() {
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}
