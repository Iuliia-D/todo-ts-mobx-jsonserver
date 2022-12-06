import React from "react";
import { TodoItem } from "../../stores/TodoListStore";
import { BsTrash } from "react-icons/bs";
import { TodoListStore } from "../../stores/TodoListStore";
import { observer } from "mobx-react-lite";

interface TodoProps {
  store: TodoListStore;
  todo: TodoItem;
}

export const Todo: React.FC<TodoProps> = observer((props: TodoProps) => {
  const { store, todo } = props;

  return (
    <li className="app__flex">
      <p>{todo.title}</p>
      <p className="todo-icons ">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => store.toggleTodo(todo.id)}
        />
        <i>
          <BsTrash onClick={() => store.deleteTodo(todo.id)} />
        </i>
      </p>
    </li>
  );
});
