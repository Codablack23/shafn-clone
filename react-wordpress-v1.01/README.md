# Development setup

-   Install dependencies:

    ```shell
    yarn
    ```

-   Create Stripe account and set Publishable and Secret key from
    [dashboard](https://dashboard.stripe.com) as environment variables
    (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and NEXT_PUBLIC_STRIPE_SECRET_KEY
    respectively) in the `.env.example` file. Add remaining variable values from
    `next.config.js` file and rename `.env.example` to `.env.local`

-   [Install the Stripe CLI](https://stripe.com/docs/stripe-cli)

-   Sync local timestamp with Stripe's timestamp by following this
    [guide](https://developers.google.com/time/guides) for your OS. Note:
    Replace `time.google.com` with `time.android.com`

-   Open another terminal. From the react-wordpress folder, run:

    ```shell
    yarn stripe:listen
    ```

-   Copy webhook signing secret from terminal and set as env variable
    (NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET) in the `.env.local` file

-   Open terminal. From the react-wordpress folder, run:

    ```shell
    yarn dev
    ```

-   In the checkout page, use `4242 4242 4242 4242` as card number, `04/24` as
    date and `424` as CVV

    ### Happy Coding!
