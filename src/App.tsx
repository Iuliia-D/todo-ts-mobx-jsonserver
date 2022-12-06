import "./app.scss";

import TodoList from "./components/TodoList/TodoList";
import TodoStore from "./stores/TodoListStore";
import { AddTodoPopup } from "./components/AddTodo/AddTodoPopup";
import { useState } from "react";
import Filter from "./components/Filter/Filter";

export const App = () => {
  const [popupActive, setPopupActive] = useState<boolean>(false);

  return (
    <div className="app app__flex">
      <div className="app-container app__flex">
        <div className="_btn">
          <button onClick={() => setPopupActive(true)}>Добавить задачу</button>
        </div>
        <AddTodoPopup
          todoStore={TodoStore}
          popupActive={popupActive}
          setPopupActive={setPopupActive}
        />
        <Filter />
        <TodoList todoStore={TodoStore} />
      </div>
    </div>
  );
};
