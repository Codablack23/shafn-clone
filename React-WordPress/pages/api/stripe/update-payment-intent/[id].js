const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default function handler(req, res) {
    const { id } = req.query;
    const { orderId } = req.body;

    return new Promise(async (resolve, reject) => {
        try {
            const paymentIntent = await stripe.paymentIntents.update(id, {
                metadata: {
                    orderId,
                },
            });

            res.status(200).json(paymentIntent);
            resolve();
        } catch (error) {
            console.log("Error updating payment intent");
            console.error(error);
            res.status(500).json("Couldn't complete payment");
            reject();
        }
    });
}
