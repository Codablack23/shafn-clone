import React from 'react';

const NextArrow = props => {
    const { className, onClick, icon } = props;
    return (
        <button
            className={`slick-arrow slick-next ${className}`}
            onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className=""></i>
            )}
        </button>
    );
};

export default NextArrow;
