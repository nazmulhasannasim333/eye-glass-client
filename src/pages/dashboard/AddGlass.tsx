import { Button } from "@material-tailwind/react";
import { FieldValues, useForm } from "react-hook-form";
import { useAddEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const AddGlass = () => {
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const { register, handleSubmit } = useForm();
  const [addGlass] = useAddEyeGlassMutation();

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
            };
            await addGlass(glassData);
            console.log({ glassData });
            toast.success("Product added successfully!", {
              id: toastId,
              duration: 2000,
            });
          }
        });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("productName")}
          type="text"
          placeholder="productName"
        />
        <input
          {...register("productPrice")}
          type="number"
          placeholder="productPrice"
        />
        <input
          {...register("productQuantity")}
          type="number"
          placeholder="productQuantity"
        />
        <input
          {...register("frameMaterial")}
          type="text"
          placeholder="frameMaterial"
        />
        <input
          {...register("frameShape")}
          type="text"
          placeholder="frameShape"
        />
        <input {...register("lensType")} type="text" placeholder="lensType" />
        <input {...register("brand")} type="text" placeholder="brand" />
        <input {...register("gender")} type="text" placeholder="gender" />
        <input {...register("color")} type="text" placeholder="color" />
        <input type="file" {...register("productImage")} />
        <Button placeholder={""} type="submit">
          Add Glass
        </Button>
      </form>
    </div>
  );
};

export default AddGlass;
