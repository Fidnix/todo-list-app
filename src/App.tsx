import "./App.css";

import CreateDialog from "./components/todo/CreatingTodoDialog";
import TodoCounter from "./components/todo/TodoCounter";
import TodoList from "./components/todo/TodoList";
import TodoSearch from "./components/todo/TodoSearch";

import { TodosProvider } from "./contexts/todosContext";

function App() {
  return (
    <TodosProvider>
      <main className="flex flex-col gap-4 w-[600px] max-sm:w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Todo app
        </h1>
        <TodoCounter />
        <TodoSearch />
        <TodoList />
        <CreateDialog />
      </main>
    </TodosProvider>
  );
}

export default App;
