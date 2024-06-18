import React from "react";

export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
    }
}

export function getDiscountPercent(regularPrice, salePrice) {
    const percent = ((regularPrice - salePrice) / regularPrice) * 100;
    return `${percent.toFixed(2)}%`;
}

export function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find(
            (item) => item.slug === slug.toString()
        );
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export function getItemBySlug(banners, slug) {
    if (banners && banners.length > 0) {
        const banner = banners.find((item) => item.slug === slug.toString());
        if (banner !== undefined) {
            return banner;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/*Work only with Strapi API*/
export function convertSlugsQueryString(payload) {
    let query = "";
    if (payload.length > 0) {
        payload.forEach((item) => {
            if (query === "") {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
    }
    return query;
}
