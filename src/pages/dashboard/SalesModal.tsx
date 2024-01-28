import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSellEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";

const SalesModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const handleOpen = () => setOpen(!open);
  const [sellProduct] = useSellEyeGlassMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const productQuantity = Number(data.quantity);
      const { productId, buyerName } = data;
      const sellData = { productId, buyerName, quantity: productQuantity };

      const res: any = await sellProduct(sellData);
      console.log(res);
      if (res?.error?.data) {
        toast.error(`${data.quantity} is more than the product quantity`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Product sell successfully!", {
          id: toastId,
          duration: 2000,
        });
        handleOpen();
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Button
        placeholder={""}
        variant="filled"
        color="orange"
        className="py-2 px-3"
        onClick={handleOpen}
      >
        Sell
      </Button>
      <Dialog
        placeholder={""}
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card placeholder={""} className="mx-auto w-full max-w-[24rem]">
            <CardBody placeholder={""} className="flex flex-col gap-4">
              <Typography placeholder={""} variant="h4" color="blue-gray">
                Sell The Glass
              </Typography>

              <Typography placeholder={""} className="-mb-2" variant="h6">
                Quantity
              </Typography>
              <Input
                {...register("quantity")}
                type="number"
                crossOrigin={""}
                placeholder={""}
                label="Quantity"
                size="lg"
              />
              <Typography placeholder={""} className="-mb-2" variant="h6">
                Buyer Name
              </Typography>
              <Input
                {...register("buyerName")}
                crossOrigin={""}
                placeholder={""}
                label="Buyer Name"
                size="lg"
              />
              <div className="hidden">
                <Input
                  {...register("productId")}
                  defaultValue={id}
                  type="text"
                  crossOrigin={""}
                  placeholder={""}
                  label="id"
                  size="lg"
                />
              </div>
              <div className="-ml-2.5 -mt-3"></div>
            </CardBody>
            <CardFooter placeholder={""} className="pt-0">
              <Button
                type="submit"
                placeholder={""}
                color="green"
                variant="gradient"
                fullWidth
              >
                Sell Glass
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
};

export default SalesModal;
