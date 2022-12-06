import React, { useEffect } from "react";
import { TodoListStore } from "../../stores/TodoListStore";
import { observer } from "mobx-react-lite";
import { Todo } from "./Todo";
import "./todoList.scss";

interface TodoListProps {
  todoStore: TodoListStore;
}

const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  const { filteredBy, todos } = todoStore;

  const filtered = () => {
    switch (filteredBy) {
      case "all":
        return todos;
      case "isCompleted":
        return [...todos.filter((todo) => todo.complete)];
      case "isNotCompleted":
        return [...todos.filter((todo) => !todo.complete)];
      default:
        return todos;
    }
  };

  useEffect((): void => {
    todoStore.getTodos();
  }, []);

  return (
    <ul className="todo-item app__flex">
      {filtered().map((todo) => (
        <Todo key={todo.id} todo={todo} store={todoStore} />
      ))}
    </ul>
  );
});

export default TodoList;
