import { BrowserRouter, Route, Routes } from "react-router";
import TasksPage from "./routes/TasksPage/TasksPage";
import GlobalLayout from "./routes/GlobalLayout/GlobalLayout";
import TaskInfoPage from "./routes/TaskInfoPage/TaskInfoPage";
import CreateTaskPage from "./routes/CreateTaskPage/CreateTaskPage";
import { Navigate } from "react-router";
import "./globals.css";
import CreateEmployeeModal from "./components/CreateEmployeeModal/CreateEmployeeModal";
import createProvider from "./utils/createProvider";
import DataStore from "./stores/DataStore";
import CreateEmployeeModalStore from "./stores/CreateEmployeeModalStore";

export const [useDataStore, DataStoreProvider] = createProvider(DataStore);
export const [useCreateEmployeeModalStore, CreateEmployeeModalStoreProvider] = createProvider(CreateEmployeeModalStore);

const App = () => {
  return (
    <DataStoreProvider>
      <CreateEmployeeModalStoreProvider>
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
        <CreateEmployeeModal />
      </CreateEmployeeModalStoreProvider>
    </DataStoreProvider>
  );
};

export default App;
