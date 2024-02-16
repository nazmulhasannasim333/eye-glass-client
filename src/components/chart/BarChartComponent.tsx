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
  });

  const brandData: BrandData[] = Array.from(brandDataMap.values());
  console.log(brandData);

  const screenWidth = window.innerWidth;
  const chartWidth = screenWidth <= 768 ? 320 : 500;

  if (SIsFetching) {
    return (
      <>
        <h1>Loading</h1>
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
