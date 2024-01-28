import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";
import { useState } from "react";

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

const TABLE_HEAD = [
  "Product",
  "Price",
  "Quantity",
  "Brand",
  "Lens",
  "Gender",
  "Material",
  "Edit",
  "Delete",
  "Sale",
];

const AllGlasses = () => {
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [lens, setLens] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const query = {
    material,
    shape,
    lens,
    brand,
    gender,
    color,
    minPrice,
    maxPrice,
    searchTerm,
  };
  const { data: eyeGlasses } = useGetAllEyeGlassQuery(query);
  console.log(eyeGlasses);
  console.log(searchTerm);

  return (
    <Card placeholder={""} className="h-full w-full">
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        className="rounded-none "
      >
        <div className="mb-6 mt-4 flex items-center justify-between gap-8">
          <div>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Material
              </option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
              <option value="Acetate">Acetate</option>
            </select>
          </div>
          <div>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Shape
              </option>
              <option value="Rectangular">Rectangular</option>
              <option value="Round">Round</option>
              <option value="Cat-eye">Cat-eye</option>
            </select>
          </div>
          <div>
            <select
              value={lens}
              onChange={(e) => setLens(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Lens
              </option>
              <option value="Single-vision">Single-vision</option>
              <option value="Bifocal">Bifocal</option>
              <option value="Progressive">Progressive</option>
            </select>
          </div>
          <div>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Brand
              </option>
              <option value="Lenskart">Lenskart</option>
              <option value="Prada">Prada</option>
              <option value="Gucci">Gucci</option>
            </select>
          </div>
          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="block appearance-none w-36 bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm "
            >
              <option value="" disabled>
                Filter by Color
              </option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              onBlur={(e) => setMinPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Min"
            />
            <input
              onBlur={(e) => setMaxPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <Typography placeholder={""} variant="h4" color="blue-gray">
              All Glasses
            </Typography>
          </div>
          <div className="w-full md:w-96">
            <Input
              crossOrigin={""}
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Search Glass"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className="overflow-scroll px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
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
                  gender,
                  frameMaterial,
                  brand,
                }: TEyeGlass,
                index: number
              ) => {
                const isLast = index === eyeGlasses?.data?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <img
                          className="h-20 w-28 rounded-lg object-cover object-center"
                          src={productImage}
                          alt={productImage}
                        />
                        <div className="flex flex-col">
                          <Typography
                            placeholder={""}
                            color="blue-gray"
                            className="font-normal text-lg"
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
                        {gender}
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
                      <Tooltip content="Edit & Duplicate">
                        <Button
                          placeholder={""}
                          variant="outlined"
                          size="sm"
                          color="blue"
                        >
                          Edit & Duplicate
                        </Button>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Delete Glass">
                        <Button
                          placeholder={""}
                          variant="gradient"
                          size="sm"
                          color="red"
                        >
                          Delete
                        </Button>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Sell Glass">
                        <Button
                          placeholder={""}
                          variant="filled"
                          size="sm"
                          color="orange"
                        >
                          Sell
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default AllGlasses;
