import getRawBody from "raw-body";
import WPOrderRepository from "~/repositories/WP/WPOrderRepository";
import WPPaymentRepository from "~/repositories/WP/WPPaymentRepository";

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
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const handlePaymentSuccess = async () => {
        const { orderId, order_session_id } = event.data.object.metadata;
        try {
            await WPOrderRepository.updateOrder({
                orderId,
                data: {
                    set_paid: true,
                },
            });

            await WPPaymentRepository.updateOrderSession({
                id: order_session_id,
                data: {
                    paid: true,
                },
            });
        } catch (error) {
            console.log("error updating order...");
            console.error(error);
        }
    };

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
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
