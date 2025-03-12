import { BrowserRouter, Route, Routes } from "react-router";
import TasksPage from "./routes/TasksPage/TasksPage";
import GlobalLayout from "./routes/GlobalLayout/GlobalLayout";
import TaskInfoPage from "./routes/TaskInfoPage/TaskInfoPage";
import CreateTaskPage from "./routes/CreateTaskPage/CreateTaskPage";
import { Navigate } from "react-router";
import "./globals.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" index element={<TasksPage />} />
          <Route path="/task/:id" index element={<TaskInfoPage />} />
          <Route path="/createTask" index element={<CreateTaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
