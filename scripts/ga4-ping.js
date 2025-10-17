import fetch from "node-fetch";

const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const payload = {
  client_id: "test-12345",
  events: [{ name: "page_view", params: { page_title: "GA4 VSCode Test" } }],
};

const url = `https://www.google-analytics.com/mp/collect?measurement_id=${id}&api_secret=${process.env.GA_API_SECRET}`;

fetch(url, { method: "POST", body: JSON.stringify(payload) })
  .then(() => console.log("Sent GA4 ping. Check Realtime view."))
  .catch((err) => console.error("GA4 ping failed:", err));
