import getRawBody from "raw-body";
import WPOrderRepository from "~/repositories/WP/WPOrderRepository";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const rawBody = await getRawBody(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const handlePaymentSuccess = async () => {
        const { orderId } = event.data.object.metadata;
        await WPOrderRepository.updateOrder({
            orderId,
            data: {
                status: "processing",
            },
        });
    };

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            console.log("Payment successful");
            await handlePaymentSuccess();
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
