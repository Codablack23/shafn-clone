"use strict";

/**
 * order controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, orderId, user } = ctx.request.body.data;

    const line_items = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.floor(Number(product.amount) * 100),
      },
      quantity: product.quantity,
    }));

    try {
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: user.email,
        payment_method_types: ["card"],
        success_url: `${process.env.SHAFN_DOMAIN}/account/checkout-success`,
        cancel_url: `${process.env.SHAFN_DOMAIN}/account/checkout?payment_status=cancelled`,
        metadata: {
          orderId,
          user_first_name: user.first_name,
          user_last_name: user.last_name,
          user_email: user.email,
        },
      });

      await strapi.service("api::order.order").create({
        data: {
          stripe_id: session.id,
          products: {
            data: products,
          },
        },
      });

      return { stripeSession: session };
    } catch (error) {
      console.log("Error while creating order session");
      console.error(error);
      ctx.response.status = 500;
      return error;
    }
  },
}));
