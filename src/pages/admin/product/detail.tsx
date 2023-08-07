import { useGetProductByIdQuery } from "@/api/product";
import { Table, Button } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData } = useGetProductByIdQuery(idProduct || "");

  const dataSource = [
    {
      key: productData?.id,
      name: productData?.name,
      price: productData?.price,
      desc: productData?.desc,
    },
  ];
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div className="flex space-x-2">
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => navigate("/admin/product")}>
              Quay lại
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
        <Button type="primary" className="bg-blue-500 h-[40px]">
          <Link to="/admin/product/add" className="flex place-items-center">
            <AiOutlinePlus />
            Thêm sản phẩm
          </Link>
        </Button>
      </header>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProductDetail;
