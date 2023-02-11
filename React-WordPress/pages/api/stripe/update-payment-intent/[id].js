const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default function handler(req, res) {
    const { id } = req.query;
    const { orderId, order_session_id } = req.body;

    return new Promise((resolve, reject) => {
        stripe.paymentIntents
            .update(id, {
                metadata: {
                    orderId,
                    order_session_id,
                },
            })
            .then((paymentIntent) => {
                res.status(200).json(paymentIntent);
                resolve();
            })
            .catch((error) => {
                console.log("Error updating payment intent");
                console.error(error);
                res.status(500).json("Couldn't complete payment");
                reject();
            });
    });
}
