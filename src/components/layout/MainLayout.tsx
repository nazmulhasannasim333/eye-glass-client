import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-5">
          <h1 className="text-2xl font-bold mb-5">
            <Outlet />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
