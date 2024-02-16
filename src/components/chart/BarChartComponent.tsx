/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllSalesQuery } from "../../redux/features/sales/salesApi";
import { useAppSelector } from "../../redux/hooks";
import { CardHeader } from "@material-tailwind/react";
interface BrandData {
  brand: string;
  totalQuantity: number;
  totalSalesPrice: number;
}

const BarChartComponent = () => {
  const user = useAppSelector(selectCurrentUser);
  const userInfo = {
    email: user?.email,
    role: user?.role,
  };
  const { data: sales, isFetching: SIsFetching } = useGetAllSalesQuery({
    userInfo,
  });

  const brandDataMap: Map<string, BrandData> = new Map();

  // Calculate total quantity and total sales price for each brand
  sales?.data?.forEach((transaction: any) => {
    const brand = transaction?.productId?.brand;
    if (brand) {
      const quantity = transaction?.quantity;
      const salesPrice = transaction?.productId?.productPrice * quantity;

      if (!brandDataMap.has(brand)) {
        brandDataMap.set(brand, {
          brand: brand,
          totalQuantity: quantity,
          totalSalesPrice: salesPrice,
        });
      } else {
        const existingBrandData = brandDataMap.get(brand)!;
        existingBrandData.totalQuantity += quantity;
        existingBrandData.totalSalesPrice += salesPrice;
        brandDataMap.set(brand, existingBrandData);
      }
    }
  });

  const brandData: BrandData[] = Array.from(brandDataMap.values());
  console.log(brandData);

  const screenWidth = window.innerWidth;
  const chartWidth = screenWidth <= 768 ? 320 : 500;

  if (SIsFetching) {
    return (
      <>
        <CardHeader
          placeholder={""}
          shadow={false}
          floated={false}
          className="relative grid h-56 place-items-center bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </CardHeader>
      </>
    );
  }

  return (
    <div>
      <BarChart width={chartWidth} height={400} data={brandData} barSize={20}>
        <XAxis
          dataKey="brand"
          scale="point"
          padding={{ left: 20, right: 20 }}
          tick={{ fontSize: 18 }}
        />
        <YAxis tick={{ fontSize: 20 }} />
        <Tooltip
          wrapperStyle={{
            fontSize: "16px",
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: "16px",
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="totalSalesPrice"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
        <Bar
          dataKey="totalQuantity"
          fill="#23a145"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
