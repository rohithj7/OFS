import { dispatchSales } from './dispatchService.js';

// console.log('Scheduled dispatch task is running every minute.');

// Schedule the function to run every minute
setInterval(async () => {
  try {
    await dispatchSales();
    // console.log('Scheduled dispatch completed.');
  } catch (err) {
    console.error('Error in scheduled dispatch:', err);
  }
}, 60 * 1000);