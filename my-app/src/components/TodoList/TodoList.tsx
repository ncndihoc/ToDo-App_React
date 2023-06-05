import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";
import { Todo } from "../../@types/todo.types";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const doneTodos = todos.filter((todo) => todo.done === true);
  const undoneTodos = todos.filter((todo) => todo.done === false);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    const todosObj = JSON.parse(todosString || "[]");
    setTodos(todosObj);
  }, []);

  const addTodo = (name: string) => {
    const todo = {
      id: new Date().toISOString(),
      name,
      done: false,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);

    const todosString = localStorage.getItem("todos");
    const todosObj = JSON.parse(todosString || "[]");
    const newTodosObj = [...todosObj, todo];
    localStorage.setItem("todos", JSON.stringify(newTodosObj));
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

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id);
    if (findedTodo) {
      setCurrentTodo(findedTodo);
    }
  };

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name };
      return null;
    });
  };

  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo;
        }
        return todo;
      });
    });
    setCurrentTodo(null);
    const todosString = localStorage.getItem("todos");
    const todosObj = JSON.parse(todosString || "[]");
    const newTodosObj = todosObj.map((todo: { id: string | undefined }) => {
      if (todo.id === currentTodo?.id) {
        return currentTodo;
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(newTodosObj));
  };

  const deleteTodo = (id: string) => {
    if (currentTodo?.id === id) {
      setCurrentTodo(null);
    }
    setTodos((prev) => {
      const findedIndexTodo = prev.findIndex((todo) => todo.id === id);
      if (findedIndexTodo !== -1) {
        const result = [...prev];
        result.splice(findedIndexTodo, 1);
        return result;
      }
      return [...prev];
    });
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          editTodo={editTodo}
          currentTodo={currentTodo}
          finishEditTodo={finishEditTodo}
        />
        <TaskList
          todos={undoneTodos}
          doneTaskList={false}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todos={doneTodos}
          doneTaskList
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
