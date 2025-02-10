import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useContext } from "react";
import { Todo } from "@/interfaces/todo";
import { TodosContext } from "@/contexts/todosContext";

function TodoItem({
  todo,
  doneAction,
  deleteTodo,
}: {
  todo: Todo;
  doneAction: () => void;
  deleteTodo: () => void;
}) {
  const { description, isDone, name } = todo;
  return (
    <AccordionItem value={`elem-${todo.id}`}>
      <div className="gap-4 grid grid-cols-[min-content_1fr_min-content] items-center w-full">
        <Checkbox
          checked={isDone}
          onCheckedChange={doneAction}
          onClick={(e) => e.stopPropagation()}
          className="flex-grow-0"
        />
        <AccordionTrigger className="text-left">
          <p
            className={`text-lg font-semibold w-full ${
              isDone ? "line-through" : ""
            }`}
          >
            {name}
          </p>
        </AccordionTrigger>
        <Button
          className="w-min h-min"
          variant="destructive"
          onClick={deleteTodo}
        >
          <X />
        </Button>
      </div>
      <AccordionContent>
        <p className="leading-7 [&:not(:first-child)]:mt-6 w-full text-left p-4">
          {description}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
}

function TodoList() {
  const { filteredTodos, toggleDone, deleteTodo } = useContext(
    TodosContext
  ) ?? {
    todos: [],
    toggleDone: (_: number) => {},
    deleteTodo: (_: number) => {},
    filteredTodos: [],
  };

  return (
    <ScrollArea className="h-[350px] rounded-md border">
      <div className="p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          ToDos
        </h2>
        <Accordion type="single" collapsible>
          {filteredTodos.map((todo: Todo, index: number) => (
            <TodoItem
              todo={todo}
              key={index}
              doneAction={() => toggleDone(todo.id)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
}

export default TodoList;
