import { FieldValues, useForm } from "react-hook-form";
import { useAddEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";
import { Button, Input } from "@material-tailwind/react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddGlass = () => {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const { register, handleSubmit, reset } = useForm();
  const [addGlass] = useAddEyeGlassMutation();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const formData = new FormData();
      formData.append("image", data.productImage[0]);
      fetch(image_upload_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (profileResponse) => {
          if (profileResponse.success) {
            const productImageURL = profileResponse.data.display_url;
            const productPriceConvert = Number(data.productPrice);
            const productQuantityConvert = Number(data.productQuantity);

            const {
              productName,
              frameMaterial,
              frameShape,
              lensType,
              brand,
              gender,
              color,
            } = data;

            const glassData = {
              productName,
              productPrice: productPriceConvert,
              productQuantity: productQuantityConvert,
              productImage: productImageURL,
              frameMaterial,
              frameShape,
              lensType,
              brand,
              gender,
              color,
              userEmail: user?.email,
            };
            await addGlass(glassData);
            toast.success("Product added successfully!", {
              id: toastId,
              duration: 2000,
            });
            reset();
          }
        });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="my-4 mx-10">
      <h1>Add Glass</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-5">
          <div>
            <Input
              {...register("productName")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Product Name"
            />
          </div>
          <div>
            <Input
              {...register("productPrice")}
              type="number"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Product Price"
            />
          </div>
          <div>
            <Input
              {...register("productQuantity")}
              type="number"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Product Quantity"
            />
          </div>
          <div>
            <Input
              {...register("frameMaterial")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Frame Material"
            />
          </div>
          <div>
            <Input
              {...register("frameShape")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Frame Shape"
            />
          </div>
          <div>
            <Input
              {...register("lensType")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Lens Type"
            />
          </div>
          <div>
            <Input
              {...register("brand")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Brand"
            />
          </div>
          <div>
            <Input
              {...register("color")}
              type="text"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Color"
            />
          </div>
          <div>
            <select
              className="w-full py-2 rounded-lg border border-purple-50 text-sm text-gray-500"
              {...register("gender")}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <Input
              {...register("productImage")}
              type="file"
              crossOrigin={""}
              placeholder=""
              color="indigo"
              label="Product Image"
            />
          </div>
        </div>
        <div className="flex float-end ">
          <Button
            type="submit"
            variant="gradient"
            size="sm"
            color="indigo"
            placeholder={""}
          >
            Add Glass
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddGlass;
