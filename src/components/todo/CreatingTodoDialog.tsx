import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MouseEventHandler, useContext, useState } from "react";
import { TodosContext } from "@/contexts/todosContext";

function CreateDialog() {
  const [name, setName] = useState("Task's name");
  const [description, setDescription] = useState("Task");

  const { addTodo } = useContext(TodosContext) ?? {
    todos: [],
    addTodo: () => {},
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    addTodo({ id: -1, name, description, isDone: false });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add todo</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add todo</DialogTitle>
          <DialogDescription>
            Create a new todo. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="name">ToDo Name</Label>
          <Input
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>

          <Label htmlFor="todo">ToDo description</Label>
          <Textarea
            id="todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={handleSubmit} variant="secondary">
            Create todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
