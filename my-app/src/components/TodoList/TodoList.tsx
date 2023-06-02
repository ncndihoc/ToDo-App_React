import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";
import { Todo } from "../../@types/todo.types";
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const doneTodos = todos.filter((todo) => todo.done === true);
  const undoneTodos = todos.filter((todo) => todo.done === false);

  const addTodo = (name: string) => {
    const todo = {
      id: new Date().toISOString(),
      name,
      done: false,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList
          todos={undoneTodos}
          doneTaskList={false}
          handleDoneTodo={handleDoneTodo}
        />
        <TaskList
          todos={doneTodos}
          doneTaskList
          handleDoneTodo={handleDoneTodo}
        />
      </div>
    </div>
  );
}
