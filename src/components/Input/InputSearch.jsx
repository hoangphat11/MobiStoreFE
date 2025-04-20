import React from 'react';
import './InputSearch.scss';
import { Input } from 'antd';

const { Search } = Input;

const InputSearch = ({ size = 'medium', placeholder = '', textButton = '', ...props }) => {
    return (
        <>
            <Search
                size={size}
                placeholder={placeholder}
                enterButton={textButton}
                {...props}
            />
        </>
    );
};

export default InputSearch;