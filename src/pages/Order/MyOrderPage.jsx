import React, { useCallback, useEffect, useState } from "react";
import { Button, Row, Col, Tag, Image } from "antd";
import { format } from "date-fns";
import {
  getOrdersByUserId,
  updateOrderStatus,
} from "../../services/orderService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  WrapperButtonStyle,
  WrapperCardStyle,
  WrapperHeading,
  WrapperListProducts,
} from "./style";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const MyOrderPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.info);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    document.title = "Order History Page";
    if (!params?.userId) navigate("/");
  }, [params?.userId, navigate]);

  const fetchOrdersByUserId = useCallback(async () => {
    if (!params?.userId) return null;
    try {
      const res = await getOrdersByUserId(params.userId);
      if (res?.EC === 0) return res?.DT;
      toast.warning(res?.EM);
      return null;
    } catch (error) {
      toast.error(error?.message ?? "Failed while fetching orders!");
    }
  }, [params.userId]);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ordersByUser", params.userId],
    queryFn: fetchOrdersByUserId,
    retry: 3,
    retryDelay: 1000,
    enabled: !!params.userId,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: ({ orderId, userId }) =>
      updateOrderStatus(orderId, "Cancelled", userId),
    onSuccess: async (res) => {
      if (res?.EC === 0) {
        Swal.fire("Đã huỷ!", "Đơn hàng của bạn đã được huỷ.", "success");
        refetch();
      } else {
        toast.error(res?.EM ?? "Huỷ đơn hàng thất bại!");
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error(error.message || "Đã có lỗi xảy ra.");
    },
  });

  const handleCancelOrder = (orderId) => {
    if (!orderId) return;
    Swal.fire({
      title: "Bạn có chắc muốn huỷ đơn hàng?",
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, huỷ ngay!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutation.mutateAsync({ orderId, userId: user?._id });
        } catch (error) {
          toast.error("Thao tác thất bại!");
        }
      }
    });
  };

  const debouncedCancelOrder = debounce((orderId) => {
    handleCancelOrder(orderId);
  }, 300);

  const renderOrderStatus = (status) => {
    switch (status) {
      case "Pending":
        return <Tag color="orange">Đang chờ</Tag>;
      case "Confirmed":
        return <Tag color="blue">Đã xác nhận</Tag>;
      case "Shipping":
        return <Tag color="cyan">Đang giao</Tag>;
      case "Delivered":
        return <Tag color="green">Đã giao</Tag>;
      case "Cancelled":
        return <Tag color="red">Đã huỷ</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  const handleReceivedOrder = (orderId) => {
    setSelectedOrderId(orderId);
    Swal.fire({
      title: "Nhận xét đơn hàng",
      html: `
   
        <textarea id="swal-comment" placeholder="Nhận xét của bạn..." class="swal2-textarea"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Gửi nhận xét",
      preConfirm: () => {
        const rating = document.getElementById("swal-rating").value;
        const comment = document.getElementById("swal-comment").value;
        if (!rating || rating < 1 || rating > 5) {
          Swal.showValidationMessage("Vui lòng nhập số sao từ 1 đến 5");
        }
        return { rating, comment };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { rating, comment } = result.value;
        console.log("Đánh giá:", rating, comment);
        // TODO: Gửi đánh giá đến backend nếu cần
        toast.success("Cảm ơn bạn đã đánh giá!");
        setSelectedOrderId(null);
      }
    });
  };

  if (!params?.userId) return null;

  return (
    <div
      style={{ padding: "25px 120px", background: "#efefef", width: "100%" }}
    >
      <WrapperHeading style={{ color: "blue", textAlign: "center" }}>
        Danh sách đơn hàng
      </WrapperHeading>
      <Loading isLoading={isLoading}>
        {!orders && !isLoading ? (
          <></>
        ) : (
          <Row gutter={50}>
            {orders?.map((order) => (
              <Col style={{ marginBottom: "20px" }} span={8} key={order?._id}>
                <WrapperCardStyle title={`Đơn hàng (${order?._id})`}>
                  <p>
                    <strong>Ngày tạo:</strong>{" "}
                    {format(new Date(order?.createdAt), "dd/MM/yyyy - HH:mm")}
                  </p>
                  <p>
                    <strong>Trạng thái đơn:</strong>{" "}
                    {renderOrderStatus(order?.orderStatus)}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong> {order?.totalPrice} $
                  </p>

                  <WrapperListProducts>
                    <strong>Chi tiết:</strong>
                    <ul>
                      {order?.orderItems?.length > 0 &&
                        order.orderItems.map((item, index) => (
                          <li
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "30px",
                              marginBottom: "13px",
                            }}
                          >
                            <Image
                              src={item?.image ?? ""}
                              style={{
                                height: "40px",
                                width: "40px",
                                objectFit: "cover",
                              }}
                              alt="product_img"
                            />
                            <span>
                              {item?.name} x {item?.amount}
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                              Tạm tính: {item?.amount * item?.price} $
                            </span>
                          </li>
                        ))}
                    </ul>
                  </WrapperListProducts>

                  <WrapperButtonStyle>
                    {order?.orderStatus !== "Cancelled" &&
                      order?.orderStatus !== "Delivered" &&
                      order?.orderStatus !== "Shipping" && (
                        <Button
                          type="primary"
                          danger
                          onClick={() => debouncedCancelOrder(order?._id)}
                        >
                          Huỷ đơn hàng
                        </Button>
                      )}

                    {order?.orderStatus === "Delivered" && (
                      <Button
                        type="primary"
                        onClick={() => handleReceivedOrder(order?._id)}
                      >
                        Đã nhận được hàng
                      </Button>
                    )}

                    <Button
                      type="default"
                      onClick={() => navigate(`/order/detail/${order?._id}`)}
                    >
                      Xem chi tiết
                    </Button>
                  </WrapperButtonStyle>
                </WrapperCardStyle>
              </Col>
            ))}
          </Row>
        )}
      </Loading>
    </div>
  );
};

export default MyOrderPage;
