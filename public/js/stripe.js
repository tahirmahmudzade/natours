/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';
const stripe = Stripe(
  'pk_test_51MSGdwLeJOwhHgksjXnrGmSjnbn9rjACzli5DlRHY1BJODKD5lRErw0FTlNzC4mpr4TXppgK6SHqmbKn1mWoozCQ00exlnDpVL'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
