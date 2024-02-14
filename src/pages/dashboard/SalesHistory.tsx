import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import SalesCard from "./SalesCard";
import { useGetAllSalesQuery } from "../../redux/features/sales/salesApi";
import { useState } from "react";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const SalesHistory = () => {
  const [filter, setFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);

  const userInfo = {
    email: user?.email,
    role: user?.role,
  };
  const { data: sales, isLoading } = useGetAllSalesQuery({ filter, userInfo });
  const TABLE_HEAD = [
    "Product Name",
    "Buyer Name",
    "Price",
    "Brand",
    "Lens",
    "Color",
    "Sell Quantity",
    "Download Invoice",
  ];

  if (isLoading) {
    return (
      <div>
        <div className="mt-10">
          <div className="max-w-full animate-pulse">
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
          </div>
        </div>
        <div className="mt-40 mx-0">
          <div className="max-w-full animate-pulse">
            <div className="block w-full h-3 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-3 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-3 mb-7 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>

            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>

            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card placeholder={""} className="h-full w-full">
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        className="rounded-none "
      >
        <div className="mb-6 mt-4 flex items-center justify-between gap-8"></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <Typography placeholder={""} variant="h4" color="blue-gray">
              Sales History
            </Typography>
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block appearance-none w-60 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Show Data by Filter
              </option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className="overflow-scroll px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <SalesCard sales={sales} />
        </table>
      </CardBody>
    </Card>
  );
};

export default SalesHistory;
