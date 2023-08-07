import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { IProduct } from "@/interfaces/product";
import { Table, Button, Popconfirm, Alert, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const AdminProduct = () => {
  const { data: productData, isLoading } = useGetProductsQuery();
  console.log(productData);

  const [removeProduct, { isSuccess: isRemoveSuccess }] =
    useRemoveProductMutation();

  const confirm = (id: number) => {
    removeProduct(id);
  };
  const dataSource = productData?.map(
    ({ id, name, price, desc }: IProduct) => ({
      key: id,
      name,
      price,
      desc,
    })
  );
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
      render: ({ key: id }: any) => {
        return (
          <>
            <div className="flex space-x-2 w-[200px]">
              <Popconfirm
                title="Xóa sản phẩm?"
                onConfirm={() => confirm(id)}
                okText="Xóa"
                cancelText="Cancel"
                okType="danger">
                <Button type="primary" danger>
                  Xóa
                </Button>
              </Popconfirm>

              <Button type="primary" className="bg-blue-500">
                <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
              </Button>
              <Button type="primary" className="bg-blue-500">
                <Link to={`/admin/product/${id}/detail`}>Chi tiết</Link>
              </Button>
            </div>
          </>
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
      {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default AdminProduct;
