import { Button } from "@material-tailwind/react";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";

const MainLayout = () => {
  const { data } = useGetAllEyeGlassQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1 className="text-red-600">This is main layout</h1>
      <Button placeholder={""} variant="gradient">
        gradient
      </Button>
    </div>
  );
};

export default MainLayout;
