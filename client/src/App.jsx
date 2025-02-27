import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TaskListPage from './pages/TaskListPage';
import ShowTask from './pages/ShowTask';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect '/' to '/task-list' automatically */}
        <Route path="/" element={<Navigate to="/task-list" replace />} />

        <Route path="/" element={<Layout />}>
          <Route path="/task-list" element={<TaskListPage />} />
          <Route path="/show-task/:taskid" element={<ShowTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
