const stripe = require('./stripe.client');
const HandyBooking = require('../models/handyBookings');

const currency = process.env.CURRENCY || 'cad';
const gstBps = Number(process.env.GST_RATE_BPS || 500) / 10000;           // 5%
const platformFeeBps = Number(process.env.PLATFORM_FEE_BPS || 1200) / 10000; // 12%

const calcTax = (n) => Math.round(n * gstBps);
const calcPlatformFee = (n) => Math.round(n * platformFeeBps);

/**
 * Create booking + immediate charge (escrow-style).
 */
async function createBooking({
  customerEmail,
  customerId,
  proId,
  proStripeAccountId,
  title,
  description,
  scheduledAt,
  subtotalAmount
}) {
  if (!subtotalAmount || subtotalAmount <= 0) throw new Error('subtotalAmount must be > 0');
  if (!proStripeAccountId) throw new Error('proStripeAccountId is required');

  const taxAmount = calcTax(subtotalAmount);
  const platformFeeAmount = calcPlatformFee(subtotalAmount);
  const totalAmount = subtotalAmount + taxAmount;

  const stripeCustomer = await stripe.customers.create({
    email: customerEmail,
    metadata: { appCustomerId: String(customerId) }
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency,
    description: `Handyman booking: ${title || 'Service'}`,
    customer: stripeCustomer.id,
    automatic_payment_methods: { enabled: true },
    capture_method: 'automatic',
    metadata: {
      proStripeAccountId,
      proId: String(proId)
    }
  });

  const booking = await HandyBooking.create({
    customerId,
    proId,
    proStripeAccountId,
    title,
    description,
    scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
    subtotalAmount,
    taxAmount,
    platformFeeAmount,
    totalAmount,
    stripeCustomerId: stripeCustomer.id,
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret
  });

  return { bookingId: booking._id, clientSecret: paymentIntent.client_secret, currency };
}

/**
 * Transfer payout to the handyman (net of your platform fee).
 */
async function completeAndPayout(bookingId) {
  const booking = await HandyBooking.findById(bookingId).lean();
  if (!booking) throw new Error('Booking not found');
  if (booking.transferId) return booking; // already paid

  const netToPro = Math.max(booking.totalAmount - booking.platformFeeAmount, 0);

  const transfer = await stripe.transfers.create({
    amount: netToPro,
    currency,
    destination: booking.proStripeAccountId,
    description: `Payout for booking ${bookingId}`
  });

  const updated = await HandyBooking.findByIdAndUpdate(
    bookingId,
    { status: 'PAID_OUT', transferId: transfer.id },
    { new: true }
  );

  return updated;
}

module.exports = { createBooking, completeAndPayout };
