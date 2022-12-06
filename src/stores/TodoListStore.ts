import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import axios from "axios";

type FilterType = "all" | "isCompleted" | "isNotCompleted";

export interface TodoItem {
  id: string;
  title: string;
  complete: boolean;
}

export class TodoListStore {
  todos: TodoItem[] = [];
  url: string = "http://localhost:3500/todos";
  actionStatus = "pending";
  filteredBy: FilterType = "all";

  constructor() {
    makeAutoObservable(this);
  }

  getTodos = async (): Promise<void> => {
    this.actionStatus = "pending";
    try {
      const { data } = await axios.get<TodoItem[]>(this.url);
      runInAction((): void => {
        this.todos = data;
        this.actionStatus = "done";
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = "error";
      });
    }
  };

  addTodo = async (title: string): Promise<void> => {
    const item: TodoItem = { id: v4(), title, complete: false };
    try {
      const { data } = await axios.post<TodoItem>(this.url, item);
      runInAction((): void => {
        this.todos.push(data);
        this.actionStatus = "done";
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = "error";
      });
    }
  };
  deleteTodo = async (id: string) => {
    try {
      await axios.delete<void>(`${this.url}/${id}`);
      runInAction((): void => {
        this.todos = this.todos.filter((item) => item.id !== id);
        this.actionStatus = "done";
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = "error";
      });
    }
  };

  toggleTodo = async (id: string) => {
    try {
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos[index].complete = !this.todos[index].complete;
      await axios.patch<TodoItem>(`${this.url}/${id}`, {
        complete: this.todos[index].complete,
      });
    } catch (e) {
      runInAction((): void => {
        this.actionStatus = "error";
      });
    }
  };

  filter = (condition: FilterType) => {
    this.filteredBy = condition;
  };

  get completed() {
    let filteredlist = this.todos.filter((todo) => todo.complete);
    return filteredlist;
  }
}

const TodoStore = new TodoListStore();
export default TodoStore;
