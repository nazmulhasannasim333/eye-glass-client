/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";
import { CardHeader } from "@material-tailwind/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const fontSize = "18";

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={fontSize}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = () => {
  const user = useAppSelector(selectCurrentUser);
  const userInfo = {
    email: user?.email,
    role: user?.role,
  };
  const { data: eyeGlasses, isFetching: EIsFetching } =
    useGetAllEyeGlassQuery(userInfo);

  const groupedData = eyeGlasses?.data?.reduce((acc: any, product: any) => {
    const { brand, productQuantity } = product;
    if (!acc[brand]) {
      acc[brand] = productQuantity;
    } else {
      acc[brand] += productQuantity;
    }
    return acc;
  }, {});
  const data = Object.keys(groupedData || {}).map((brand) => ({
    name: brand,
    value: groupedData[brand],
  }));

  const screenWidth = window.innerWidth;
  const chartWidth = screenWidth <= 768 ? 320 : 500;

  if (EIsFetching) {
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
    <PieChart className="lg:ms-10 ms-0" width={chartWidth} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
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
    </PieChart>
  );
};

export default PieChartComponent;
