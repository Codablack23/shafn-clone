"use strict";

/**
 * order controller
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log("creating order session...");
    const { products, user_email, amount } = ctx.request.body.data;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const order = await strapi.service("api::order.order").create({
        data: {
          paymentIntent_id: paymentIntent.id,
          products: {
            data: products,
          },
          user: user_email,
          paid: false,
        },
      });

      return {
        order_session_id: order.id,
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      console.log("Error while creating pending order");
      console.error(error);
      ctx.response.status = 500;
      return error;
    }
  },
}));
