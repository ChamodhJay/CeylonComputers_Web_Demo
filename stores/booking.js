import { defineStore } from "pinia";
import axios from "axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [],
  }),

  actions: {
    async createBooking(booking) {
      const newBooking = {
        id: Date.now(),
        ...booking,
      };

      this.bookings.push(newBooking);

      // Send confirmation emails via backend
      await this.sendConfirmationEmails(newBooking);

      return newBooking;
    },

    async confirmBooking(bookingId) {
      const booking = this.bookings.find((b) => b.id === bookingId);
      if (booking) {
        booking.status = "confirmed";

        // Send confirmation email via backend
        await this.sendBookingConfirmedEmail(booking);
      }
    },

    async sendConfirmationEmails(booking) {
      try {
        await axios.post("http://localhost:5000/send-email", {
          email: booking.email,
          subject: "Booking Confirmation",
          text: `Hello ${
            booking.name
          },\n\nYour booking has been received successfully!\n\nBooking Details:\n${JSON.stringify(
            booking,
            null,
            2
          )}`,
        });
        console.log("Confirmation email sent!");
      } catch (error) {
        console.error("Error sending confirmation email:", error);
      }
    },

    async sendBookingConfirmedEmail(booking) {
      try {
        await axios.post("http://localhost:5000/send-email", {
          email: booking.email,
          subject: "Booking Confirmed",
          text: `Hello ${booking.name},\n\nYour booking has been confirmed!\n\nThank you for choosing us.`,
        });
        console.log("Booking confirmed email sent!");
      } catch (error) {
        console.error("Error sending booking confirmed email:", error);
      }
    },
  },
});
