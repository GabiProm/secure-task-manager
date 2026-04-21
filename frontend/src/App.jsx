import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:30000";

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error loading tasks:", err);
        setError("No se pudo conectar con el backend");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [API_URL]);

  const addTask = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Error al crear tarea");
      }

      setTitle("");

      const updated = await fetch(`${API_URL}/tasks`);
      setTasks(await updated.json());
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Error al guardar la tarea");
    }
  };

  if (loading) return <p>Cargando tareas...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Secure Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTask}>Agregar</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;