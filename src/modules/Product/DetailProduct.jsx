import { Button, Col, Image, InputNumber, Rate, Row, Modal } from 'antd';
import React, { useState } from 'react';
import { WrapperAdressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQuantityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addOrderProduct } from '../../redux/slices/orderSlice';
import convertPrice from '../../utils/convertPrice';
import LikePlugin from '../../components/Plugin/LikePlugin';
import CommentPlugin from '../../components/Plugin/CommentPlugin';

const DetailProduct = ({ dataProduct = {}, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.info);
    const [numProduct, setNumProduct] = useState(1);
    const [previewVisible, setPreviewVisible] = useState(false);  // Thêm state cho modal preview ảnh
    const [previewImage, setPreviewImage] = useState('');  // Thêm state cho ảnh preview
    const [previewTitle, setPreviewTitle] = useState('');  // Thêm state cho title ảnh preview

    const handleButtonNumProduct = (type) => {
        if (type === 'plus') {
            setNumProduct(num => num + 1);
            return;
        }
        else if (type === 'minus') {
            setNumProduct(num => num - 1);
            return;
        }
        return;
    }

    const handleAddToCart = () => {
        if (!user?._id) {
            toast.warning('You must login first!');
            navigate('/sign-in', { state: location.pathname });
            return;
        }
        dispatch(addOrderProduct({
            orderItem: {
                name: dataProduct.name,
                amount: +numProduct,
                image: dataProduct.image,
                price: +dataProduct.price,
                discount: +dataProduct?.discount,
                product: dataProduct._id,
                countInStock: dataProduct?.countInStock
            }
        }));
    };

    const handlePreview = (file) => {
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1));
    };

    if (!dataProduct) return null;

    return (
        <Row style={{ padding: '16px', backgroundColor: 'white', }}>
            <Col span={10} style={{ borderRight: '1px solid #ddd', paddingRight: '15px', borderRadius: '5px' }} >
                <Image width={'100%'} src={dataProduct.image ?? ''} alt='main_img_product' preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    {/* Hiển thị các ảnh chi tiết */}
                    {dataProduct.detailImages?.map((image, index) => (
                        <WrapperStyleColImage span={4} key={index}>
                            <WrapperStyleImageSmall 
                                src={image} 
                                alt={`small_img_product_${index}`} 
                                onClick={() => handlePreview({ url: image })} // Mở ảnh preview khi click
                            />
                        </WrapperStyleColImage>
                    ))}
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '15px' }}>
                <WrapperStyleNameProduct>
                    {dataProduct?.name} <span style={{ color: 'red' }}>{dataProduct?.countInStock === 0 ? 'Đã hết hàng' : ''}</span>
                </WrapperStyleNameProduct>
                <div>
                    <Rate allowHalf defaultValue={dataProduct?.rating} />
                    <WrapperStyleTextSell> | {`Sold ${dataProduct.sold ?? 0} +`}</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        {convertPrice(dataProduct?.price) + ' $'}
                        <span style={{ marginLeft: '20px', color: 'red', fontSize: '18px' }}>{dataProduct?.discount ? `-${dataProduct.discount * 100} %` : ''}</span>
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <div>
                    <h2>Chi tiết sản phẩm :</h2>
                    <p>{dataProduct?.description}</p> 
                </div>

                <WrapperAdressProduct>
                    <span>Giao đến </span>
                    <span className='address'>{`${user?.address ?? ''}`}</span> -
                    <span className='change-address'> Đổi địa chỉ</span>
                </WrapperAdressProduct>
                <LikePlugin
                    style={{ marginTop: '20px' }}
                    dataHref={import.meta.env.VITE_APP_IS_LOCAL ? `https://developers.facebook.com/docs/plugins` : window.location.href}
                />
                <div style={{
                    margin: '20px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd',
                    padding: '10px 0'
                }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <WrapperQuantityProduct>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} onClick={() => handleButtonNumProduct('minus')} />
                            <InputNumber
                                min={1}
                                value={numProduct}
                                onChange={(value) => setNumProduct(value)} />
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} onClick={() => handleButtonNumProduct('plus')} />
                        </WrapperQuantityProduct>
                        <span style={{ fontSize: '15px' }}>{`(Còn ${dataProduct?.countInStock ?? 0} sản phẩm)`}</span>
                    </div>
                    {(numProduct > dataProduct?.countInStock) && (
                        <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                            Số lượng không được vượt quá số lượng tồn kho!
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Button
                        style={{
                            background: 'rgb(255,57,69)', color: '#fff', fontSize: '18px',
                            padding: '30px 70px', border: 'none', fontWeight: '500'
                        }}
                        disabled={(numProduct > dataProduct.countInStock) || numProduct <= 0}
                        onClick={handleAddToCart}>
                        Chọn mua
                    </Button>
                    <Button style={{
                        background: '#fff', color: 'rgb(13,92,182)', fontSize: '18px',
                        padding: '30px 70px', border: '1.2px solid rgb(13,92,182)', fontWeight: '500'
                    }}>
                        Mua trả sau
                    </Button>
                </div>
            </Col>
            <CommentPlugin
                dataHref={import.meta.env.VITE_APP_IS_LOCAL ? `https://developers.facebook.com/docs/plugins/comments#configurator` : window.location.href}
                width={1240}
            />

            {/* Modal Preview Ảnh */}
            <Modal
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Row>
    );
};

export default DetailProduct;
