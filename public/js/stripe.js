/* eslint-disable */
const { default: axios } = require('axios');

exports.bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51MSGdwLeJOwhHgksjXnrGmSjnbn9rjACzli5DlRHY1BJODKD5lRErw0FTlNzC4mpr4TXppgK6SHqmbKn1mWoozCQ00exlnDpVL'
  );
  const session = await axios({
    url: `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
  });

  await stripe.redirectToCheckout({
    sessionId: session.data.session.id,
  });
  console.log(session);
};
