'use client';

import React, { useState, useEffect } from 'react';

interface PrepTask {
    id: string;
    text: string;
    completed: boolean;
}

const DEFAULT_TASKS = [
    { id: '1', text: 'Chop Onions (5kg)', completed: false },
    { id: '2', text: 'Chop Tomatoes (5kg)', completed: false },
    { id: '3', text: 'Make Ginger Garlic Paste', completed: false },
    { id: '4', text: 'Boil Potatoes (10kg)', completed: false },
    { id: '5', text: 'Check Fryer Oil Level', completed: false },
    { id: '6', text: 'Refresh Chutneys', completed: false },
    { id: '7', text: 'Clean Workstations', completed: false },
];

export default function PrepView() {
    const [tasks, setTasks] = useState<PrepTask[]>([]);
    const [newTask, setNewTask] = useState('');
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('chef_prep_list');
        if (saved) {
            setTasks(JSON.parse(saved));
        } else {
            setTasks(DEFAULT_TASKS);
        }
    }, []);

    const saveTasks = (newTasks: PrepTask[]) => {
        setTasks(newTasks);
        localStorage.setItem('chef_prep_list', JSON.stringify(newTasks));
    };

    const toggleTask = (id: string) => {
        const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTasks(newTasks);
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const task: PrepTask = {
            id: Date.now().toString(),
            text: newTask,
            completed: false
        };
        saveTasks([...tasks, task]);
        setNewTask('');
    };

    const deleteTask = (id: string) => {
        if (confirm('Remove this task?')) {
            saveTasks(tasks.filter(t => t.id !== id));
        }
    };

    const resetDaily = () => {
        if (confirm('Reset all tasks for a new day?')) {
            const reset = tasks.map(t => ({ ...t, completed: false }));
            saveTasks(reset);
        }
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto p-4 animate-in fade-in">
            {/* Header / Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">📋 Daily Mise-en-place</h2>
                        <p className="text-gray-500">Get the kitchen ready for service!</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-[var(--brand-primary)]">{progress}%</div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Ready</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full bg-[var(--brand-primary)] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={async () => {
                            setIsLoadingAi(true);
                            try {
                                const res = await fetch('/api/kitchen/prep');
                                if (res.ok) {
                                    const suggestions = await res.json();
                                    if (Array.isArray(suggestions)) {
                                        const aiTasks = suggestions.map((s: any) => ({
                                            id: `ai-${Date.now()}-${Math.random()}`,
                                            text: `✨ AI: ${s.task} (${s.qty}) - ${s.reason}`,
                                            completed: false
                                        }));
                                        saveTasks([...tasks, ...aiTasks]);
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            } finally {
                                setIsLoadingAi(false);
                            }
                        }}
                        className="text-sm font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-lg flex items-center gap-2 border border-purple-100 shadow-sm disabled:opacity-50"
                        disabled={isLoadingAi}
                    >
                        {isLoadingAi ? '🔮 Forecasting...' : '🪄 AI Suggestions'}
                    </button>
                    <button
                        onClick={resetDaily}
                        className="text-sm font-bold text-[var(--brand-primary)] hover:bg-orange-50 px-3 py-1 rounded"
                    >
                        🔄 Reset for New Day
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${task.completed
                            ? 'bg-green-50 border-green-200 opacity-75'
                            : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-6 h-6 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                        />
                        <span className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500' : 'font-bold text-gray-800'}`}>
                            {task.text}
                        </span>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {/* Add New */}
                <form onSubmit={addTask} className="flex gap-2 mt-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add new prep task..."
                        className="flex-1 p-4 rounded-xl border border-gray-200 focus:border-[var(--brand-primary)] outline-none shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={!newTask.trim()}
                        className="px-6 bg-gray-800 text-white font-bold rounded-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        + Add
                    </button>
                </form>
            </div>
        </div>
    );
}
