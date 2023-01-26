export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById("headerSticky");
    if (header !== null) {
        if (number >= 300) {
            header.classList.add("header--sticky");
        } else {
            header.classList.remove("header--sticky");
        }
    }
};

export const generateTempArray = (maxItems) => {
    let result = [];

    for (let i = 0; i < maxItems; i++) {
        result.push(i);
    }
    return result;
};

export const scrollPageToTop = (element) => {
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
};

export const encrypt = (data) => {
    const CryptoJS = require("crypto-js");

    const encryptedData = CryptoJS.AES.encrypt(
        data,
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ).toString();

    return encryptedData;
};

export const decrypt = (encryptedData) => {
    const CryptoJS = require("crypto-js");

    const bytes = CryptoJS.AES.decrypt(
        encryptedData,
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    );
    const data = bytes.toString(CryptoJS.enc.Utf8);

    return data;
};
