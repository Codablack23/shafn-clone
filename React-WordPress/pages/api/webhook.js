const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import WPOrderRepository from "~/repositories/WP/WPOrderRepository";

export default async function handler(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const handlePaymentSuccess = async () => {
        const { orderId, user } = event.data.object.metadata;
        await WPOrderRepository.updateOrder({
            orderId,
            data: {
                status: "processing",
            },
        });
    };

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            console.log("Payment successful");
            await handlePaymentSuccess();
            break;
        case "payment_method.attached":
            const paymentMethod = event.data.object;

            console.log("Payment attached");
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}
