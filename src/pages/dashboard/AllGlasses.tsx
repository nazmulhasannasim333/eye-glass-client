import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";
import {
  useDeleteManyEyeGlassMutation,
  useGetAllEyeGlassQuery,
} from "../../redux/features/eyeGlass/eyeGlassApi";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Swal from "sweetalert2";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

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
  const [productsId, setProductsId] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [deletedAll] = useDeleteManyEyeGlassMutation();
  const user = useAppSelector(selectCurrentUser);

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
    page,
    limit: 5,
    email: user?.email,
    role: user?.role,
  };
  const { data: eyeGlasses, isLoading } = useGetAllEyeGlassQuery(query);

  const handleCheckboxClick = (id: string) => {
    if (productsId) {
      const index = productsId.indexOf(id);

      if (index === -1) {
        setProductsId([...productsId, id]);
      } else {
        const newProductsId = [...productsId];
        newProductsId.splice(index, 1);
        setProductsId(newProductsId);
      }
    }
  };

  const handleDeleteMany = async () => {
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
        await deletedAll(productsId);
        Swal.fire({
          title: "Deleted!",
          text: "Glass has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const TABLE_HEAD = [
    <Tooltip content="Delete Glass">
      <Button
        placeholder={""}
        variant="gradient"
        color="red"
        className="py-2 px-3"
        onClick={handleDeleteMany}
        disabled={!productsId[0]}
      >
        Delete All
      </Button>
    </Tooltip>,
    "Product Name",
    "Price",
    "Quantity",
    "Brand",
    "Lens",
    "Material",
    "Edit & Duplicate",
    "Update",
    "Delete",
    "Sell",
  ];

  if (isLoading) {
    return (
      <div>
        <div className="mt-10">
          <div className="max-w-full animate-pulse">
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
          </div>
        </div>
        <div className="mt-40 mx-0">
          <div className="max-w-full animate-pulse">
            <div className="block w-full h-3 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-3 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block w-full h-3 mb-7 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>

            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>

            <div className="block h-3 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              className="border border-gray-400 hover:border-gray-500 px-2 py-2 rounded focus:outline-none focus:shadow-outline w-20 text-sm"
              placeholder="Min"
            />
            <input
              onChange={(e) => setMaxPrice(e.target.value)}
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
      <CardBody placeholder={""} className=" px-0 ">
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
          <ProductCard
            eyeGlasses={eyeGlasses}
            handleCheckboxClick={handleCheckboxClick}
          />
        </table>
      </CardBody>
      <CardFooter
        placeholder={""}
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
      >
        <Typography
          placeholder={""}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {`Page ${page} `}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => setPage(page - 1)}
            placeholder={""}
            variant="outlined"
            size="sm"
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage(page + 1)}
            placeholder={""}
            variant="outlined"
            size="sm"
            disabled={eyeGlasses?.data?.length < 5}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllGlasses;
