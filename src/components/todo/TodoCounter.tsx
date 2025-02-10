import { TodosContext } from "@/contexts/todosContext";
import { useContext } from "react";

function TodoCounter() {
  const { totalDoneTodos, todos } = useContext(TodosContext) ?? {
    totalDoneTodos: 0,
  };
  return (
    <h2 className="text-xl text-muted-foreground">
      Haz completado {totalDoneTodos} de {todos?.length ?? 0} ToDos
    </h2>
  );
}

export default TodoCounter;
