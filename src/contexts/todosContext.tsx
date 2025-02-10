import { Todo } from "@/interfaces/todo";
import { createContext, ReactNode, useMemo, useState } from "react";

interface TodosContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  filteredTodos: Todo[];
  totalDoneTodos: number;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  let availableId = parseInt(localStorage.getItem("total-todos") ?? "0");
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") ?? "[]")
  );
  const [filterText, setFilterText] = useState<string>("");

  const filteredTodos = useMemo(
    () =>
      filterText === ""
        ? todos
        : todos.filter((t) => t.name.includes(filterText)),
    [todos, filterText]
  );

  const totalDoneTodos = useMemo(
    () => todos.filter((t) => t.isDone).length,
    [todos]
  );

  const addTodo = (todo: Todo) => {
    const newTodos = [...todos, { ...todo, id: availableId++ }];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    localStorage.setItem("total-todos", availableId.toString());
  };

  const toggleDone = (id: number) => {
    const newTodos = todos.map((t) =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((t) => t.id != id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleDone,
        deleteTodo,
        filterText,
        setFilterText,
        filteredTodos,
        totalDoneTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
