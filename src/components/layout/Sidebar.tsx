// // import { Link, NavLink } from "react-router-dom";
// import { useAppDispatch } from "../../redux/hooks";
// import { toast } from "sonner";
// import { logout } from "../../redux/features/auth/authSlice";
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
// } from "@material-tailwind/react";
// import { PowerIcon } from "@heroicons/react/24/solid";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const dispatch = useAppDispatch();

//   const handleLogout = () => {
//     const toastId = toast.loading("loading...");
//     dispatch(logout());
//     toast.success("Logged out", { id: toastId, duration: 2000 });
//   };
//   return (
//     <Card
//       placeholder={""}
//       className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
//     >
//       <div className="mb-2 p-4">
//         <Typography placeholder={""} variant="h5" color="purple">
//           EyeGlass Inventory
//         </Typography>
//       </div>
//       <List placeholder={""}>
//         <ListItem placeholder={""}>
//           <NavLink
//             className={({ isActive }: { isActive: boolean }) =>
//               isActive
//                 ? "flex items-center w-full p-3 bg-indigo-400  text-white font-semibold bg-opacity-80  rounded-lg text-start leading-tight transition-all outline-none"
//                 : "p-3"
//             }
//             to="/add-product"
//           >
//             Add Glass
//           </NavLink>
//         </ListItem>
//         <ListItem placeholder={""}>
//           {" "}
//           <NavLink
//             className={({ isActive }: { isActive: boolean }) =>
//               isActive
//                 ? "flex items-center w-full p-3 bg-indigo-400  text-white font-semibold bg-opacity-80  rounded-lg text-start leading-tight transition-all outline-none"
//                 : "p-3"
//             }
//             to="/all-products"
//           >
//             All Glasses
//           </NavLink>
//         </ListItem>
//         <ListItem className="" placeholder={""}>
//           {" "}
//           <NavLink
//             className={({ isActive }: { isActive: boolean }) =>
//               isActive
//                 ? "flex items-center w-full p-3 bg-indigo-400  text-white font-semibold bg-opacity-80  rounded-lg text-start leading-tight transition-all outline-none"
//                 : "p-3"
//             }
//             to="/sales-history"
//           >
//             Sales History
//           </NavLink>
//         </ListItem>
//         <div className="w-full h-1 bg-blue-gray-200"></div>
//         <ListItem onClick={handleLogout} className="mt-10" placeholder={""}>
//           <ListItemPrefix placeholder={""}>
//             <PowerIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Log Out
//         </ListItem>
//       </List>
//     </Card>
//   );
// };

// export default Sidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";

import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaChartLine, FaEye, FaGlasses, FaHome, FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="fixed">
      <div className="hidden lg:block ">
        <Card
          placeholder="..."
          color="transparent"
          shadow={false}
          className="h-[calc(100vh)] mb-0 w-full p-6 bg-gray-900  "
        >
          <div className="mb-4 mt-4 flex items-center gap-4 p-4">
            <FaGlasses className="h-6 w-6 text-white" />
            <Typography
              placeholder="..."
              variant="h5"
              color="yellow"
              className="text-3xl"
            >
              Eye Glasses
            </Typography>
          </div>
          <div className="p-2">
            <Input
              className="text-white border-2 border-white rounded-md px-4 py-2 focus:outline-none focus:border-white text-2xl"
              crossOrigin="..."
              icon={<MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />}
              label="Search"
              success
            />
          </div>
          <List placeholder="...">
            <List placeholder="..." className="p-0">
              <NavLink to="/" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaHome strokeWidth={3} className="h-6 w-6 text-gray-300" />
                  </ListItemPrefix>
                  Home
                </ListItem>
              </NavLink>
              <NavLink to="/add-product" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaPlus strokeWidth={3} className="h-6 w-6 text-gray-300" />
                  </ListItemPrefix>
                  Add Glass
                </ListItem>
              </NavLink>
              <NavLink to="/all-products" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaEye strokeWidth={3} className="h-6 w-6 text-gray-300" />
                  </ListItemPrefix>
                  Eye Glasses
                </ListItem>
              </NavLink>
              <NavLink to="/sales-history" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaChartLine
                      strokeWidth={3}
                      className="h-6 w-6 text-gray-300"
                    />
                  </ListItemPrefix>
                  Sales History
                </ListItem>
              </NavLink>
            </List>

            <hr className="my-2 border-gray-300" />

            <ListItem onClick={handleLogout} placeholder="...">
              <ListItemPrefix placeholder="...">
                <PowerIcon className="h-5 w-5 text-gray-300" />
              </ListItemPrefix>

              <Link to="/login" className="text-white">
                Log Out
              </Link>
            </ListItem>
          </List>
        </Card>
      </div>
      <IconButton
        placeholder="..."
        variant="text"
        size="lg"
        onClick={openDrawer}
        className="lg:hidden"
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-gray-300" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-gray-300" />
        )}
      </IconButton>
      <Drawer
        placeholder="..."
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="lg:hidden"
      >
        <Card
          placeholder="..."
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-blue-gray-900"
        >
          <div className="mb-6 mt-4 flex items-center gap-4 p-4">
            <FaGlasses className="h-6 w-6 text-white" />
            <Typography
              placeholder="..."
              variant="h5"
              color="white"
              className="text-lg"
            >
              Eye Glasses
            </Typography>
          </div>
          <div className="p-2">
            <Input
              className="text-white border-2 border-white rounded-md px-4 py-2 focus:outline-none focus:border-white text-2xl"
              crossOrigin="..."
              icon={<MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />}
              label="Search"
              success
            />
          </div>
          <List placeholder="...">
            <List placeholder="..." className="p-0">
              <NavLink to="/" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaHome strokeWidth={3} className="h-6 w-6 text-gray-300" />
                  </ListItemPrefix>
                  Home
                </ListItem>
              </NavLink>
              <NavLink to="/add-product" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaPlus strokeWidth={3} className="h-6 w-6 text-gray-300" />
                  </ListItemPrefix>
                  Add Glass
                </ListItem>
              </NavLink>
              <NavLink to="/all-products" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaEye strokeWidth={3} className="h-6 w-6 text-gray-300" />
                  </ListItemPrefix>
                  Eye Glasses
                </ListItem>
              </NavLink>
              <NavLink to="/sales-history" className="text-white">
                <ListItem placeholder="...">
                  <ListItemPrefix placeholder="...">
                    <FaChartLine
                      strokeWidth={3}
                      className="h-6 w-6 text-gray-300"
                    />
                  </ListItemPrefix>
                  Sales History
                </ListItem>
              </NavLink>
            </List>

            <hr className="my-2 border-gray-300" />

            <ListItem onClick={handleLogout} placeholder="...">
              <ListItemPrefix placeholder="...">
                <PowerIcon className="h-5 w-5 text-gray-300" />
              </ListItemPrefix>

              <Link to="/login" className="text-white">
                Log Out
              </Link>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
  );
};

export default Sidebar;
