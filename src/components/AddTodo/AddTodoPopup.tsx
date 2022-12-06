import React, { useState } from "react";
import { TodoListStore } from "../../stores/TodoListStore";
import { observer } from "mobx-react-lite";
import "./AddTodoPopup.scss";

interface AddTodoProps {
  todoStore: TodoListStore;
  popupActive: boolean;
  setPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTodoPopup: React.FC<AddTodoProps> = observer(
  ({ todoStore, popupActive, setPopupActive }) => {
    const [value, setValue] = useState<string>("");
    return (
      <div
        className={`popup ${popupActive ? "active__popup" : ""}`}
        onClick={() => setPopupActive(false)}
      >
        <div
          className={`popup__content ${popupActive ? "active__popup" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup__header">
            <button onClick={() => setPopupActive(false)}>Закрыть</button>
          </div>
          <form
            className="add-todo-container app__flex"
            onSubmit={(e) => {
              e.preventDefault();
              setValue("");
            }}
          >
            <input
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Введите название"
            />
            <button
              onClick={(): Promise<void> | void => {
                value && todoStore.addTodo(value);
              }}
            >
              Ок
            </button>
          </form>
        </div>
      </div>
    );
  }
);
