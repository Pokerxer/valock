# Website Development Rules

## Rule 1 — Design & User Experience

- The website must be **mobile-first**. Most Nigerians browse on their phones, so every page must look and work perfectly on small screens before anything else.
- Pages must **load fast on slow internet connections**. Avoid heavy animations, large image files, or unnecessary scripts. Target a load time of under 3 seconds even on 3G.
- Use **simple, clear language** throughout. Avoid technical or fancy words. A customer in Oshodi and a customer in Lekki should both understand every word on the screen.
- Every button must be **large enough to tap on a phone** without zooming in.
- Use your **brand colors consistently** across every page. Pick 2–3 colors and stick to them.
- Never make a customer click more than **3 steps** to place an order. The fewer steps, the better.

---

## Rule 2 — Pages the Website Must Have

The following pages are mandatory:

- **Homepage** — explains what the service is, how it works in 3 simple steps, pricing info, and a clear "Place an Order" button
- **Order Page** — where customers fill in their details and item list
- **Pricing Page** — shows commission rate, delivery fee structure, and examples
- **Track My Order Page** — customer enters order ID or phone number to see live status
- **About Us Page** — who you are, your mission, and why customers should trust you
- **Contact Page** — WhatsApp button, email, phone number, and a simple contact form
- **FAQ Page** — answers to the most common questions customers will ask
- **Terms & Conditions Page** — covers refunds, liability, price changes, and cancellations
- **Login / Sign Up Page** — for returning customers to manage their orders

---

## Rule 3 — Order Form Rules

- The order form must collect exactly these fields and nothing more unless necessary: full name, phone number, delivery address, item list, preferred market or store, delivery time preference, and payment method.
- Every field must have a **clear label and placeholder text** showing the customer what to type.
- The form must **validate inputs** before submission — phone number must be a valid Nigerian number, address cannot be blank, item list cannot be empty.
- After submitting the form, the customer must see an **order summary screen** showing everything they entered before they pay. They must be able to go back and edit if something is wrong.
- The form must work smoothly without the page refreshing and losing the customer's information.

---

## Rule 4 — Payment Rules

- Integrate **Paystack** as the primary payment gateway. It is the most trusted in Nigeria and supports cards, bank transfer, and USSD.
- Add **Flutterwave** as a backup payment option.
- The customer must see a **clear price breakdown** before the payment screen — item estimate, commission, delivery fee, and total.
- After a successful payment, the customer must receive an **automatic confirmation** via SMS or WhatsApp with their order ID and estimated delivery time.
- If a payment fails, the customer must see a clear error message and be allowed to try again without losing their order details.
- Never store card details on your own server. Let Paystack or Flutterwave handle all card data securely.
- For Cash on Delivery orders, collect a small booking fee online before confirming the order.

---

## Rule 5 — Customer Account Rules

- Customers must be able to **sign up with their phone number or email**. Do not make signing up compulsory to place a first order — allow guest checkout.
- Returning customers with accounts must be able to see their **full order history**, current order status, and saved delivery addresses.
- Passwords must be **securely hashed** — never stored as plain text.
- Include a **"Forgot Password"** option that sends a reset link via email or OTP via SMS.
- Add **two-factor authentication** as an option for security-conscious customers.

---

## Rule 6 — Order Tracking Rules

- Every order must have a **unique order ID** generated automatically.
- The tracking page must show the order status in clear stages: Order Received → Shopper Assigned → Shopping in Progress → On the Way → Delivered.
- Update the tracking status in **real time or near real time** — do not make the customer refresh the page manually.
- Send the customer an automatic **WhatsApp or SMS notification** at every stage change.
- The tracking page must be accessible **without logging in** — just with the order ID or phone number.

---

## Rule 7 — Admin Dashboard Rules

- The admin dashboard must be on a **separate, secure URL** that customers cannot access.
- The dashboard must show: all incoming orders, pending orders, active orders, completed orders, and cancelled orders — in real time.
- Admins must be able to: assign a shopper to an order, update order status manually, view customer details, process refunds, and view total daily and monthly revenue.
- Every admin action must be **logged with a timestamp and the admin's name** so there is always an audit trail.
- The dashboard must show **daily and monthly earnings** in a simple chart or summary.
- Admin accounts must be protected by **strong passwords and 2FA**.

---

## Rule 8 — Shopper/Runner Dashboard Rules

- Shoppers must have their own **simple dashboard or mobile-friendly page** where they can see assigned orders.
- Each order card shown to the shopper must include: customer name, phone number, item list, market/store to go to, delivery address, and the agreed budget.
- Shoppers must be able to update the order status from their phone: Mark as "Shopping Started", "Items Purchased", "Out for Delivery", "Delivered".
- Shoppers must not be able to see other shoppers' orders or any admin financial data.

---

## Rule 9 — Security Rules

- The entire website must run on **HTTPS** — no exceptions. Get an SSL certificate before launch.
- Never expose customer phone numbers, addresses, or payment details in the browser URL or page source.
- All API calls between your frontend and backend must be **authenticated with secure tokens**.
- Protect against common attacks: SQL injection, cross-site scripting (XSS), and brute force login attempts.
- Set a **rate limit** on your order and payment endpoints so no one can spam your system.
- Back up your database **automatically every 24 hours** and store backups securely.

---

## Rule 10 — Performance Rules

- All images on the website must be **compressed** before uploading. Use WebP format where possible.
- Use a **Content Delivery Network (CDN)** to serve static files faster across Nigeria.
- The homepage must score at least **70 on Google PageSpeed Insights** for mobile.
- The website must not crash or slow down if **100 customers are using it at the same time**.
- Test the website on the most popular Nigerian devices: low-end Android phones like Tecno and Infinix.

---

## Rule 11 — WhatsApp Integration Rules

- Every page must have a **floating WhatsApp button** so customers can reach you instantly.
- After an order is placed, automatically send a **WhatsApp message** to the customer with their order summary.
- At every order status update, send an **automated WhatsApp notification** using the WhatsApp Business API or a service like **Twilio** or **Wati**.
- The WhatsApp contact number displayed must be a **dedicated business number**, not a personal number.

---

## Rule 12 — SEO & Discoverability Rules

- Every page must have a proper **title tag and meta description** so Google can find and rank it.
- Register and verify your website on **Google Business Profile** so you appear in local searches.
- Use keywords your customers actually search for in Nigeria such as "buy things for me in Lagos", "grocery delivery service Nigeria", "personal shopper Lagos".
- Add your business to **local Nigerian directories** like VConnect and Businesses.com.ng.

---

## Rule 13 — Launch Checklist Rules

Before going live, confirm every item on this list:

- All pages load correctly on mobile and desktop
- Order form submits and saves correctly to the database
- Payment processes successfully on Paystack test mode and live mode
- Confirmation SMS or WhatsApp is sent after payment
- Order status updates in real time on the tracking page
- Admin dashboard shows new orders instantly
- SSL certificate is active and the site loads on HTTPS
- All broken links are fixed
- Terms and Conditions and Privacy Policy pages are live
- Contact form sends messages to your email
- The website has been tested on Chrome, Firefox, and an Android phone

---

## Rule 14 — Maintenance Rules

- Review and test the website **every month** for broken features.
- Update your payment gateway SDK whenever a new version is released.
- Monitor your server **uptime daily** using a free tool like UptimeRobot — you must know immediately if your site goes down.
- Collect customer feedback after every 50 orders and use it to improve the website.
- Never make major changes to the website during **peak hours** — do updates late at night.

---

Follow these rules from day one and your website will be solid, trustworthy, and ready to handle real customers in Nigeria.
