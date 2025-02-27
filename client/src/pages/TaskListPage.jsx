import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { showToast } from "../helper/showToast";
import TaskBoard from "../components/TaskBoard"; // ✅ Import TaskBoard

const TaskListPage = () => {
    const [referesh, setReferesh] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setReferesh(false);
        const getTask = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`);
            const responseData = await response.json();
            setTasks(responseData);
        };
        getTask();
    }, [referesh]);

    const deleteTask = async (taskid) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskid}`, {
                method: "DELETE",
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setReferesh(true);
            showToast("success", responseData.message);
        } catch (error) {
            showToast("error", error.message);
        }
    };

    return (
        <div className="pt-5">
            

            {/* ✅ Replace task list rendering with TaskBoard component */}
            {tasks && tasks.status ? (
                <TaskBoard tasks={tasks.taskData} onDelete={deleteTask} />
            ) : (
                <>Loading...</>
            )}
        </div>
    );
};

export default TaskListPage;
