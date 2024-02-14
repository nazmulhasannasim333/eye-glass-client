import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useGetSaleQuery } from "../../redux/features/sales/salesApi";
import moment from "moment";
import fallbackImage from "../../assets/no-image.png";
import { useReactToPrint } from "react-to-print";

const DownloadPDF = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { data: saleData } = useGetSaleQuery(id);
  console.log({ saleData });
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const TABLE_HEAD = [
    "Item",
    "Price",
    "Quantity",
    "Brand",
    "Lens",
    "Color",
    "Frame Material",
  ];

  return (
    <>
      <Button
        placeholder={""}
        variant="outlined"
        color="cyan"
        className="py-2 px-3"
        onClick={handleOpen}
      >
        Download
      </Button>
      <Dialog size="lg" placeholder={""} open={open} handler={handleOpen}>
        <DialogBody ref={componentRef} placeholder={""}>
          <div className="max-w-4xl mx-auto bg-white rounded shadow-sm">
            <div className="grid grid-cols-2">
              <div className="mb-2">
                <Typography placeholder={""} variant="h5" color="purple">
                  EyeGlass Inventory
                </Typography>
              </div>
              <div className="text-right">
                <p>Eye Glass Inc.</p>
                <p className="text-gray-500 text-sm">support@eyeglass.com</p>
                <p className="text-gray-500 text-sm mt-1">+880 1722-142333</p>
                <p className="text-gray-500 text-sm mt-1">
                  VAT: +880 1722-142333
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-8">
              <div>
                <p className="font-bold text-gray-800">Bill to :</p>
                <p className="text-gray-500">{saleData?.data?.buyerName}</p>
                <p className="text-gray-500">{saleData?.data?.userEmail}</p>
              </div>
              <div className="text-right">
                <p>
                  Invoice number:
                  <span className="text-gray-500">
                    EGI-{saleData?.data?._id}
                  </span>
                </p>
                <p>
                  Invoice date:
                  <span className="text-gray-500">
                    {moment(saleData?.data?.createdAt).format("l, LT")}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-8 w-12 rounded-lg object-cover object-center"
                        src={
                          saleData?.data?.productId?.productImage ||
                          fallbackImage
                        }
                        alt={"Product Image"}
                      />
                      <div className="flex flex-col">
                        <Typography
                          placeholder={""}
                          color="blue-gray"
                          className="font-normal text-[12px]"
                        >
                          {saleData?.data?.productId?.productName || (
                            <p className="text-red-300">"Sold Out"</p>
                          )}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      $
                      {saleData?.data?.productId?.productPrice || (
                        <p className="text-red-300">Not Found</p>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {saleData?.data?.quantity || (
                        <p className="text-red-300">Not Found</p>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {saleData?.data?.productId?.brand || (
                        <p className="text-red-300">Not Found</p>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {saleData?.data?.productId?.lensType || (
                        <p className="text-red-300">Not Found</p>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {saleData?.data?.productId?.color || (
                        <p className="text-red-300">Not Found</p>
                      )}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {saleData?.data?.productId?.frameMaterial || (
                        <p className="text-red-300">Not Found</p>
                      )}
                    </Typography>
                  </td>
                </tr>
              </table>
              <div className="text-end pe-10">
                <p className="text-blue-gray-800 font-bold">
                  Total:{" "}
                  <span>
                    {" "}
                    $
                    {saleData?.data?.productId?.productPrice || (
                      <p className="text-red-300">Not Found</p>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            onClick={handlePrint}
            type="submit"
            placeholder={""}
            variant="outlined"
            color="cyan"
          >
            <span>Download PDF</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DownloadPDF;
