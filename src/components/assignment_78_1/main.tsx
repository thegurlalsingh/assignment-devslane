import React, { useEffect, useMemo, useRef, useState } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

type Filter = "all" | "active" | "completed";

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const STORAGE_KEY = "ts-react-todos:v1";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<Filter>("all");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const visible = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter(t => !t.done);
      case "completed":
        return todos.filter(t => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const remaining = useMemo(() => todos.filter(t => !t.done).length, [todos]);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [{ id: uid(), text, done: false, createdAt: Date.now() }, ...prev]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggle(id: string) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.done));
  }

  function updateText(id: string, text: string) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text } : t)));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10">
      <div className="w-full max-w-xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
        </header>

        <div className="rounded-2xl bg-white shadow p-4 md:p-5">
          {/* Input Row */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") addTodo();
              }}
              placeholder="What needs doing?"
              aria-label="New todo"
              className="flex-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <button
              onClick={addTodo}
              className="rounded-xl px-4 py-2 bg-black text-white hover:bg-black/90 active:scale-[.99] shadow"
            >
              Add
            </button>
          </div>

          {/* Toolbar */}
          <div className="mt-4 flex flex-wrap items-center gap-2 justify-between">
            <div className="text-sm text-gray-600">
              {remaining} item{remaining === 1 ? "" : "s"} left
            </div>
            <div className="flex gap-2 text-sm">
              <FilterButton current={filter} setFilter={setFilter} value="all" label="All" />
              <FilterButton current={filter} setFilter={setFilter} value="active" label="Active" />
              <FilterButton current={filter} setFilter={setFilter} value="completed" label="Completed" />
            </div>
            <button
              onClick={clearCompleted}
              className="text-sm rounded-lg px-3 py-1 border border-gray-300 hover:bg-gray-50"
            >
              Clear completed
            </button>
          </div>

          {/* List */}
          <ul className="mt-4 space-y-2">
            {visible.length === 0 && (
              <li className="text-sm text-gray-400 text-center py-8">No todos yet</li>
            )}
            {visible.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggle(todo.id)}
                onDelete={() => remove(todo.id)}
                onTextChange={(text) => updateText(todo.id, text)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ current, setFilter, value, label }: {
  current: Filter;
  setFilter: (f: Filter) => void;
  value: Filter;
  label: string;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => setFilter(value)}
      className={
        "rounded-lg px-3 py-1 border " +
        (active
          ? "bg-gray-900 text-white border-gray-900"
          : "border-gray-300 hover:bg-gray-50")
      }
    >
      {label}
    </button>
  );
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onTextChange,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onTextChange: (text: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) editRef.current?.focus();
  }, [editing]);

  function save() {
    const clean = draft.trim();
    if (clean && clean !== todo.text) onTextChange(clean);
    setEditing(false);
  }

  function cancel() {
    setDraft(todo.text);
    setEditing(false);
  }

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={onToggle}
        className="size-5"
        aria-label={todo.done ? "Mark as active" : "Mark as completed"}
      />

      {!editing ? (
        <button
          onDoubleClick={() => setEditing(true)}
          onClick={onToggle}
          className={`flex-1 text-left select-none ${todo.done ? "line-through text-gray-400" : ""}`}
        >
          {todo.text}
        </button>
      ) : (
        <input
          ref={editRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          onBlur={save}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1"
        />
      )}

      <button
        onClick={() => setEditing(v => !v)}
        className="text-xs rounded-lg px-2 py-1 border border-gray-300 hover:bg-gray-100"
      >
        {editing ? "Save" : "Edit"}
      </button>

      <button
        onClick={onDelete}
        className="text-xs rounded-lg px-2 py-1 border border-red-300 text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </li>
  );
}
