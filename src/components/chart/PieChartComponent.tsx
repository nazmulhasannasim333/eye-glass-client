/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";

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
  const { data: eyeGlasses } = useGetAllEyeGlassQuery(userInfo);

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

  return (
    <PieChart className="ms-10" width={400} height={400}>
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
