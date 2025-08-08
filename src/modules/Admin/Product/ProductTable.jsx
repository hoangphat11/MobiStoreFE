import _ from "lodash";
import { Input, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useProducts } from "../../../hooks/useProducts";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import exportFileExcel from "../../../utils/exportFileExcel";
import ProductDelete from "./ProductDelete";
import ProductUpdate from "./ProductUpdate";
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
} from "react";
import TableComponent from "../../../components/Table/TableComponent";

const ProductTable = forwardRef((props, ref) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [productIdDeleted, setProductIdDeleted] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    listProducts,
    isLoading,
    refetchProducts,
    dataProduct,
    setProductId,
  } = useProducts();

  // xuất hàm fetchAllProducts cho ProductAddnew dùng
  useImperativeHandle(ref, () => ({
    refetchProducts,
  }));

  const handleDetailProduct = useCallback((id) => {
    if (id) {
      setProductId(id);
      setIsOpenDrawer(true);
    }
  }, []);

  const handleConfirmDelete = useCallback((id) => {
    if (id) {
      setIsShowModalDelete(true);
      setProductIdDeleted(id);
    }
  }, []);

  const renderAction = useCallback(
    (id) => {
      return (
        <>
          <EditOutlined
            style={{
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "15px",
              color: "#1677ff",
            }}
            onClick={() => handleDetailProduct(id)}
          />
          <DeleteOutlined
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleConfirmDelete(id)}
          />
        </>
      );
    },
    [handleDetailProduct]
  );

  // Cột bảng
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
    },
    {
      title: "Sold",
      dataIndex: "sold",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => renderAction(record._id),
    },
  ];

  // Lọc sản phẩm theo thanh tìm kiếm
  const filteredProducts = listProducts?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Thanh công cụ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Space>
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
        </Space>
        <ButtonComponent
          onClick={() =>
            exportFileExcel(filteredProducts, "Products", "products-table.xlsx")
          }
          text={"Export .xlsx"}
          icon={<ExportOutlined />}
          style={{ background: "#52c41a", color: "#fff", width: "10%" }}
        />
      </div>

      {/* Bảng sản phẩm */}
      <TableComponent
        data={filteredProducts}
        isLoading={isLoading}
        columns={columns}
      />

      {/* Modal cập nhật */}
      <ProductUpdate
        dataProduct={dataProduct}
        isOpenDrawer={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        refetchProducts={refetchProducts}
      />

      {/* Modal xóa */}
      <ProductDelete
        productId={productIdDeleted}
        isModalOpen={isShowModalDelete}
        setShowModal={setIsShowModalDelete}
        refetchProducts={refetchProducts}
      />
    </>
  );
});

export default ProductTable;
