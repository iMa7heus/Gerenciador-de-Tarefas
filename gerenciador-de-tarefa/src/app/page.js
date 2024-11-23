'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para adicionar uma tarefa
  const addTask = async () => {
    if (newTask.trim() === '') {
      alert('Por favor, insira um nome para a tarefa.');
      return;
    }
    await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  // Função para marcar uma tarefa como feita
  const markAsDone = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: 'PATCH' });
    fetchTasks();
  };

  // Função para filtrar as tarefas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.done;
    if (filter === 'pending') return !task.done;
    return true;
  });

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTask}>Adicionar Tarefa</button>
      <div>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('done')}>Concluídas</button>
        <button onClick={() => setFilter('pending')}>Pendentes</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.done ? 'line-through' : 'none',
              }}
            >
              {task.id + " - "} {task.task + " "}
            </span>
            <button onClick={() => markAsDone(task.id)}>
              Marcar como feita
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}