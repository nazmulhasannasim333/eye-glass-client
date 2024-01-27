import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";
import AddGlass from "../../pages/dashboard/AddGlass";

const MainLayout = () => {
  const { data } = useGetAllEyeGlassQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1 className="text-red-600">This is main layout</h1>
      <AddGlass />
    </div>
  );
};

export default MainLayout;
