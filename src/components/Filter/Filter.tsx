import cn from "classnames";
import { observer } from "mobx-react-lite";
import TodoListStore from "../../stores/TodoListStore";

const Filter = () => {
  const { filteredBy, filter } = TodoListStore;

  const filteredByAllClasses = cn({
    "filter-item": true,
    _active: filteredBy === "all",
  });

  const filteredByIsCompletedClasses = cn({
    "filter-item": true,
    _active: filteredBy === "isCompleted",
  });

  const filteredByIsNotCompletedClasses = cn({
    "filter-item": true,
    _active: filteredBy === "isNotCompleted",
  });

  return (
    <div className="filter">
      <div className={filteredByAllClasses} onClick={() => filter("all")}>
        Все
      </div>
      <div
        className={filteredByIsCompletedClasses}
        onClick={() => filter("isCompleted")}
      >
        Выполненные
      </div>
      <div
        className={filteredByIsNotCompletedClasses}
        onClick={() => filter("isNotCompleted")}
      >
        Не выполненные
      </div>
    </div>
  );
};

export default observer(Filter);
