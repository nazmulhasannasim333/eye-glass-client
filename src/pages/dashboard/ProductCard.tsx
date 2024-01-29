import {
  Button,
  Checkbox,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import EditDuplicateModal from "./EditDuplicateModal";
import UpdateModal from "./UpdateModal";
import fallbackImage from "../../assets/no-image.png";
import { useDeleteEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import Swal from "sweetalert2";
import SalesModal from "./SalesModal";

type TEyeGlass = {
  _id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  lensType: string;
  gender: string;
  frameShape: string;
  frameMaterial: string;
  color: string;
  brand: string;
};

type Tprops = {
  eyeGlasses: {
    data: TEyeGlass[];
  };
};

const ProductCard: React.FC<
  Tprops & { handleCheckboxClick: (id: string) => void }
> = ({ eyeGlasses, handleCheckboxClick }) => {
  const [deleteGlass] = useDeleteEyeGlassMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteGlass(id);
        Swal.fire({
          title: "Deleted!",
          text: "Glass has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <tbody>
      {eyeGlasses?.data?.map(
        (
          {
            _id,
            productName,
            productPrice,
            productQuantity,
            productImage,
            lensType,
            frameMaterial,
            brand,
          }: TEyeGlass,
          index: number
        ) => {
          const isLast = index === eyeGlasses?.data?.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={_id}>
              <td className={classes}>
                <Checkbox
                  onClick={() => handleCheckboxClick(_id)}
                  className="py-2 px-2"
                  crossOrigin={""}
                  label=""
                />
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <img
                    className="h-8 w-12 rounded-lg object-cover object-center"
                    src={productImage ? productImage : fallbackImage}
                    alt={productImage}
                  />
                  <div className="flex flex-col">
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="font-normal text-[12px]"
                    >
                      {productName}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    ${productPrice}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {productQuantity}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {brand}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {lensType}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {frameMaterial}
                </Typography>
              </td>
              <td className={classes}>
                <EditDuplicateModal id={_id} />
              </td>
              <td className={classes}>
                <UpdateModal id={_id} />
              </td>
              <td className={classes}>
                <Tooltip content="Delete Glass">
                  <Button
                    placeholder={""}
                    variant="gradient"
                    color="red"
                    className="py-2 px-3"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </td>
              <td className={classes}>
                <SalesModal id={_id} />
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  );
};

export default ProductCard;
