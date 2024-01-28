import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  useAddEyeGlassMutation,
  useGetEyeGlassQuery,
} from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";
const image_upload_token = import.meta.env.VITE_image_upload_token;

const EditDuplicateModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const { data: glassData } = useGetEyeGlassQuery(id);
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  const [addGlass] = useAddEyeGlassMutation();
  const handleOpen = () => setOpen(!open);

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
            toast.success("Product duplicate successfully!", {
              id: toastId,
              duration: 2000,
            });
            handleOpen();
          }
        });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Button
        placeholder={""}
        variant="outlined"
        color="blue"
        className="py-2 px-3"
        onClick={handleOpen}
      >
        Edit & Duplicate
      </Button>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
              <DialogHeader placeholder={""}>Edit & Duplicate</DialogHeader>
              <div
                onClick={handleOpen}
                className="me-4 cursor-pointer border-2 border-red-400 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <DialogBody placeholder={""}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-5">
                <div>
                  <Input
                    {...register("productName")}
                    defaultValue={glassData?.data?.productName}
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
                    defaultValue={glassData?.data?.productPrice}
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
                    defaultValue={glassData?.data?.productQuantity}
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
                    defaultValue={glassData?.data?.frameMaterial}
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
                    defaultValue={glassData?.data?.frameShape}
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
                    defaultValue={glassData?.data?.lensType}
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
                    defaultValue={glassData?.data?.brand}
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
                    defaultValue={glassData?.data?.color}
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
                    defaultValue={glassData?.data?.gender}
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
            </DialogBody>
            <DialogFooter placeholder={""}>
              <Button
                type="submit"
                placeholder={""}
                variant="gradient"
                color="green"
              >
                <span>Duplicate</span>
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default EditDuplicateModal;
