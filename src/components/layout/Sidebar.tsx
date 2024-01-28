import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import { logout } from "../../redux/features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col justify-between h-screen ">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-orange-600">EyeGlass</h2>
        <ul className="space-y-2">
          <NavLink
            className={({ isActive }) => (isActive ? "bg-deep-orange-400" : "")}
            to="/add-product"
          >
            <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
              Add Glass
            </li>
          </NavLink>
          <div className="pb-3">
            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-deep-orange-400" : ""
              }
              to="/all-products"
            >
              <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
                Eye Glasses
              </li>
            </NavLink>
          </div>
          <NavLink
            className={({ isActive }) => (isActive ? "bg-deep-orange-400" : "")}
            to="/sales-history"
          >
            <li className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer">
              Sales History
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="p-4 bg-gray-900">
        <Link onClick={handleLogout} to="/login">
          <p className="text-xl py-1 px-1 hover:bg-gray-700">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
