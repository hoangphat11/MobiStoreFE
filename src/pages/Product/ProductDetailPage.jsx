import React, { useEffect } from 'react';
import DetailProduct from '../../modules/Product/DetailProduct';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useProducts } from '../../hooks/useProducts';
import Alert from '../../components/Alert/Alert';
import Loading from '../../components/Loading/Loading';
import { Breadcrumb } from 'antd';

const ProductDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { dataProduct, isLoadingDetail } = useProducts(params?.productId ?? '');

    useEffect(() => {
        document.title = `${dataProduct?.name ?? 'Detail product'}`;
    }, [dataProduct]);

    if (_.isEmpty(params?.productId)) return null;

    return (
        <div style={{ width: '100%', padding: '100px 120px', background: '#efefef' }}>
            <Loading isLoading={isLoadingDetail}>
                {isLoadingDetail ? (
                    <div style={{ height: '500px' }} />
                ) : (
                    <>
                        {!_.isEmpty(dataProduct) ? (
                            <>
                                {/* Nút Back và Breadcrumb nằm bên trái, cùng 1 hàng */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    marginBottom: '20px'
                                }}>
                                    {/* Nút quay lại */}
                                    <button
                                        onClick={() => navigate(-1)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            fontSize: '16px',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span style={{ fontSize: '18px' }}>←</span>
                                    </button>

                                    {/* Breadcrumb */}
                                    <Breadcrumb
                                        items={[
                                            { title: <NavLink to="/">Home</NavLink> },
                                            { title: <NavLink to="#">Detail product</NavLink> }
                                        ]}
                                        separator=">"
                                    />
                                </div>

                             <div>
                                   {/* Nội dung chi tiết sản phẩm */}
                               
                                   <DetailProduct  dataProduct={dataProduct} />
                             </div>
                            </>
                        ) : (
                            <div style={{ height: '500px' }}>
                                <Alert isHeader={true} heading={`Oops! You've got an error`}>
                                    <p style={{ fontSize: '28px', color: 'grey' }}>
                                        Not found any product data
                                    </p>
                                </Alert>
                            </div>
                        )}
                    </>
                )}
            </Loading>
        </div>
    );
};

export default ProductDetailPage;
