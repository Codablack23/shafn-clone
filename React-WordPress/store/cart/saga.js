import { all, put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";

import {
    actionTypes,
    getCartError,
    getCartSuccess,
    updateCartSuccess,
    updateCartError,
} from "./action";

const modalSuccess = (type) => {
    notification[type]({
        message: "Success",
        description: "This product has been added to your cart!",
        duration: 1,
    });
};
const modalWarning = (type) => {
    notification[type]({
        message: "Remove A Item",
        description: "This product has been removed from your cart!",
        duration: 1,
    });
};

export const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

function* getCartSaga() {
    try {
        yield put(getCartSuccess());
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* addItemSaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(
            localStorage.getItem("persist:martfury")
        ).cart;
        let currentCart = JSON.parse(localCart);
        let existItem = currentCart.cartItems.find(
            (item) =>
                item.id === product.id &&
                item.variation_id === product.variation_id
        );
        if (existItem) {
            existItem.quantity += product.quantity;
        } else {
            if (!product.quantity) {
                product.quantity = 1;
            }
            currentCart.cartItems.push(product);
        }
        currentCart.amount = calculateAmount(currentCart.cartItems);
        currentCart.cartTotal++;
        yield put(updateCartSuccess(currentCart));
        modalSuccess("success");
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* removeItemSaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).cart
        );
        let index = localCart.cartItems.findIndex(
            (item) =>
                item.id === product.id &&
                item.variation_id === product.variation_id
        );
        localCart.cartTotal = localCart.cartTotal - product.quantity;
        localCart.cartItems.splice(index, 1);
        localCart.amount = calculateAmount(localCart.cartItems);
        if (localCart.cartItems.length === 0) {
            localCart.cartItems = [];
            localCart.amount = 0;
            localCart.cartTotal = 0;
        }
        yield put(updateCartSuccess(localCart));
        modalWarning("warning");
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* removeItemsSaga(payload) {
    try {
        const { products } = payload;

        console.log(products);

        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).cart
        );

        products.forEach((product) => {
            const productIndex = localCart.cartItems.findIndex(
                (item) => item.id === product.id
            );

            if (productIndex !== -1) {
                const cartProduct = localCart.cartItems[productIndex];
                const remQty = cartProduct.quantity - (product.quantity || 1);

                if (remQty < 1) {
                    localCart.cartItems.splice(productIndex, 1);
                    localCart.cartTotal--;
                } else {
                    localCart.cartItems[productIndex] = {
                        ...cartProduct,
                        quantity: remQty,
                    };
                }
            }
        });

        localCart.amount = calculateAmount(localCart.cartItems);
        if (localCart.cartItems.length === 0) {
            localCart.cartItems = [];
            localCart.amount = 0;
            localCart.cartTotal = 0;
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* increaseQtySaga(payload) {
    try {
        const { product } = payload;
        let localCart = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) =>
                item.id === product.id &&
                item.variation_id === product.variation_id
        );

        if (selectedItem) {
            const isVariableProduct = product.variation_id !== 0;
            if (isVariableProduct) {
                if (
                    selectedItem.quantity !== product.variation_stock_quantity
                ) {
                    selectedItem.quantity++;
                    localCart.cartTotal++;
                    localCart.amount = calculateAmount(localCart.cartItems);
                } else {
                    notification["warning"]({
                        description: "Cannot exceed stock quantity",
                    });
                }
            } else if (selectedItem.quantity !== product.stock_quantity) {
                selectedItem.quantity++;
                localCart.cartTotal++;
                localCart.amount = calculateAmount(localCart.cartItems);
            } else {
                notification["warning"]({
                    description: "Cannot exceed stock quantity",
                });
            }
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* decreaseItemQtySaga(payload) {
    try {
        const { product } = payload;
        const localCart = JSON.parse(
            JSON.parse(localStorage.getItem("persist:martfury")).cart
        );
        let selectedItem = localCart.cartItems.find(
            (item) =>
                item.id === product.id &&
                item.variation_id === product.variation_id
        );

        if (selectedItem && selectedItem.quantity > 0) {
            selectedItem.quantity--;
            localCart.cartTotal--;
            localCart.amount = calculateAmount(localCart.cartItems);
        }
        yield put(updateCartSuccess(localCart));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* clearCartSaga() {
    try {
        const emptyCart = {
            cartItems: [],
            amount: 0,
            cartTotal: 0,
        };
        yield put(updateCartSuccess(emptyCart));
    } catch (err) {
        yield put(updateCartError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CART, getCartSaga)]);
    yield all([takeEvery(actionTypes.ADD_ITEM, addItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ITEMS, removeItemsSaga)]);
    yield all([takeEvery(actionTypes.INCREASE_QTY, increaseQtySaga)]);
    yield all([takeEvery(actionTypes.DECREASE_QTY, decreaseItemQtySaga)]);
}
