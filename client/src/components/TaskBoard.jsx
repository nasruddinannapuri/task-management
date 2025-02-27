import React, { useState, useEffect } from "react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    if (newTask.title && newTask.deadline) {
      const updatedTasks = [...tasks, { ...newTask, id: Date.now(), status: "todo" }];
      setTasks(updatedTasks);
      setNewTask({ title: "", description: "", priority: "Low", deadline: "" });
    }
  };

  const updateStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const renderTasks = (status) =>
    tasks
      .filter((task) => task.status === status && task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((task) => (
        <div key={task.id} className="p-4 bg-white rounded-lg shadow-md mb-3 border">
          <span className={`px-2 py-1 text-xs rounded-full ${task.priority === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
            {task.priority}
          </span>
          <h3 className="font-bold text-lg mt-2">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-gray-500 mt-2"><strong>Deadline:</strong> {task.deadline}</p>
          <select onChange={(e) => updateStatus(task.id, e.target.value)} value={task.status} className="mt-2 p-1 border rounded text-sm w-full">
            <option value="todo">To-Do</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      ));

  return (
    <div className="flex flex-col md:flex-row p-5 max-w-screen-xl mx-auto">
      {/* Sidebar Toggle Button for Mobile */}
      <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden bg-gray-700 text-white p-2 rounded mb-4">
        {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar */}
      <div className={`w-full md:w-1/4 bg-gray-100 p-4 rounded-lg ${showSidebar ? "block" : "hidden"} md:block`}>
        <input
          type="text"
          placeholder="Search Project"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Task Summary */}
        <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-md">Expired Tasks</h3>
          <p className="text-2xl">{tasks.filter(task => new Date(task.deadline) < new Date()).length}</p>
        </div>
        <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-md">All Active Tasks</h3>
          <p className="text-2xl">{tasks.filter(task => task.status !== "completed").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-md">Completed Tasks</h3>
          <p className="text-2xl">{tasks.filter(task => task.status === "completed").length}</p>
        </div>
      </div>

      {/* Task Board */}
      <div className="w-full md:w-3/4 pl-4">
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-100 rounded-lg">
          <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleChange} className="p-2 border rounded w-full md:w-1/5" />
          <input type="text" name="description" placeholder="Description" value={newTask.description} onChange={handleChange} className="p-2 border rounded w-full md:w-1/5" />
          <input type="date" name="deadline" value={newTask.deadline} onChange={handleChange} className="p-2 border rounded w-full md:w-1/6" />
          <select name="priority" value={newTask.priority} onChange={handleChange} className="p-2 border rounded w-full md:w-1/6">
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">Add Task</button>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3">To Do</h3>
            {renderTasks("todo")}
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3">In Progress</h3>
            {renderTasks("progress")}
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Completed</h3>
            {renderTasks("completed")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
