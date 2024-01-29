// import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";
import { logout } from "../../redux/features/auth/authSlice";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };
  return (
    <Card
      placeholder={""}
      className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
    >
      <div className="mb-2 p-4">
        <Typography placeholder={""} variant="h5" color="purple">
          EyeGlass Inventory
        </Typography>
      </div>
      <List placeholder={""}>
        <ListItem placeholder={""}>
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "flex items-center w-full p-3 bg-indigo-400  text-white font-semibold bg-opacity-80  rounded-lg text-start leading-tight transition-all outline-none"
                : "p-3"
            }
            to="/add-product"
          >
            Add Glass
          </NavLink>
        </ListItem>
        <ListItem placeholder={""}>
          {" "}
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "flex items-center w-full p-3 bg-indigo-400  text-white font-semibold bg-opacity-80  rounded-lg text-start leading-tight transition-all outline-none"
                : "p-3"
            }
            to="/all-products"
          >
            All Glasses
          </NavLink>
        </ListItem>
        <ListItem className="" placeholder={""}>
          {" "}
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "flex items-center w-full p-3 bg-indigo-400  text-white font-semibold bg-opacity-80  rounded-lg text-start leading-tight transition-all outline-none"
                : "p-3"
            }
            to="/sales-history"
          >
            Sales History
          </NavLink>
        </ListItem>
        <div className="w-full h-1 bg-blue-gray-200"></div>
        <ListItem onClick={handleLogout} className="mt-10" placeholder={""}>
          <ListItemPrefix placeholder={""}>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
