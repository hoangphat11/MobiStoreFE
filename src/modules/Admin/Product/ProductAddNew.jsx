import { Button, Form, Image, Modal, Select, Upload } from 'antd';
import { fetchAllProductTypes } from '../../../redux/slices/productSlice';
import { getBase64 } from '../../../utils/getBase64';
import { InputForm } from '../../../components/Input';
import { postAddNewProduct } from '../../../services/productService';
import { toast } from 'react-toastify';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { WrapperUploadAvatar } from '../../../pages/Profile/style';
import buildSelectOptions from '../../../utils/buildSelectOptions';
import Loading from '../../../components/Loading/Loading';
import React, { useCallback, useEffect, useState } from 'react';

const ProductAddNew = ({ isModalOpen = false, setIsShowModal = () => { }, ...props }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [fileList, setFileList] = useState([]); // ảnh chi tiết sản phẩm
    const productTypes = ['Laptop', 'Smartphone', 'Tablet', 'TV'];
    const [showInputNewType, setShowInputNewType] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProductTypes({}));
    }, []);

    const mutation = useMutation({
        mutationFn: postAddNewProduct,
        onSuccess: async (res) => {
            if (res?.EC === 0) {
                toast.success(res?.EM ?? 'Create new product success');
                handleCancel();
                props?.refetchProducts();
            } else
                toast.error(res?.EM ?? 'Create new product failed !');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleCancel = () => {
        setIsShowModal(false);
        form.resetFields();
        setImage('');
        setFileList([]); // reset ảnh chi tiết
        setShowInputNewType(false);
    };

    const handleOnchangeAvatar = useCallback(async ({ fileList }) => {
        if (fileList?.length <= 0) return;
        const file = fileList[0];
        if (file?.url || file?.preview) return;
        file.preview = await getBase64(file.originFileObj);
        setImage(file?.preview);
    }, []);

    const handleChange = (value) => {
        form.setFieldValue('type', value);
        setShowInputNewType(value === 'add_type');
    };

    const handleDetailImagesChange = async ({ fileList: newFileList }) => {
        const processedList = await Promise.all(
            newFileList.map(async (file) => {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                return file;
            })
        );
        setFileList(processedList);
    };

    const onFinish = async (values) => {
        const detailImages = fileList.map((file) => file.preview); // chuyển mảng ảnh chi tiết thành base64
        await mutation.mutateAsync({
            image,
            images: detailImages,
            ...values,
            type: values?.newType ?? values?.type,
        });
        mutation.reset();
    };

    return (
        <Modal title="Add new product" open={isModalOpen} onCancel={handleCancel} footer={null}>
            <Loading isLoading={mutation.isPending}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        type: productTypes?.length > 0 ? productTypes[0] : '',
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                        <InputForm placeholder="Type your name..." />
                    </Form.Item>

                    <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please input type!' }]}>
                        <Select style={{ width: 150 }} onChange={handleChange} options={buildSelectOptions(productTypes)} />
                    </Form.Item>

                    {showInputNewType &&
                        <Form.Item label="New Type" name="newType" rules={[{ required: true, message: 'Please input new type!' }]}>
                            <InputForm placeholder="Input new type..." />
                        </Form.Item>
                    }

                    <Form.Item label="Count in stock" name="countInStock" rules={[{ required: true, message: 'Please input count in stock!' }]}>
                        <InputForm placeholder="Type count in stock..." />
                    </Form.Item>

                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                        <InputForm placeholder="Type price..." />
                    </Form.Item>

                    <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please input rating!' }]}>
                        <InputForm placeholder="Type rating..." />
                    </Form.Item>

                    <Form.Item label="Discount" name="discount">
                        <InputForm placeholder="Type discount..." />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <InputForm placeholder="Type description..." />
                    </Form.Item>

                    <Form.Item label="Image">
                        <WrapperUploadAvatar onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </WrapperUploadAvatar>
                        {image &&
                            <Image
                                src={image}
                                style={{ height: '75px', width: '75px', borderRadius: '50%', objectFit: 'cover', marginTop: '15px' }}
                                alt="image_prod"
                            />
                        }
                    </Form.Item>

                    {/* 🔥 Ảnh chi tiết sản phẩm */}
                    {/* <Form.Item label="Ảnh chi tiết sản phẩm">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleDetailImagesChange}
                            beforeUpload={() => false}
                            multiple
                        >
                            {fileList.length < 6 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item> */}

                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit" style={{ padding: '20px', fontSize: '18px' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
        </Modal>
    );
};

export default ProductAddNew;
