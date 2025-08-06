import axios from '../setup/axios';


const getAllOrders = () => {
    return axios.get(`/order`);
}

const getOrdersByUserId = (id) => {
    return axios.get(`/order/get-orders-by-userId/${id}`);
}

const getDetailOrder = (orderId, id) => {
    return axios.get(`/order/get-detail-order/${orderId}`, { params: { id } });
}

const postCreateNewOrder = (data) => {
    return axios.post('/order/create', { ...data });
}

const updateOrderStatus = (orderId, status) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("Không tìm thấy token");
        return;
    }

    // Giải mã token để lấy userId
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const userId = decodedPayload._id;

    if (!userId) {
        console.error("Không tìm thấy userId trong token");
        return;
    }

    return axios.put(`/order/update-status/${orderId}?id=${userId}`, {
        orderStatus: status
    });
};




const deleteOrder = ({ orderId, id }) => {
    return axios.delete(`/order/delete/${orderId}`, { params: { id } });
}

export {
    getAllOrders, getOrdersByUserId, postCreateNewOrder, getDetailOrder, deleteOrder, updateOrderStatus
};