import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { TodosContext } from "@/contexts/todosContext";

function TodoSearch() {
  const { filterText, setFilterText } = useContext(TodosContext) ?? {
    filterText: "",
    setFilterText: () => {},
  };
  return (
    <div className="flex flex-col justify-start gap-2">
      <Label htmlFor="search" className="w-full text-left">
        Buscar
      </Label>
      <Input
        name="search"
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search task..."
      />
    </div>
  );
}

export default TodoSearch;
