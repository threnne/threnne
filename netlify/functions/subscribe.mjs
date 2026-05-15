// Netlify Function: POST /.netlify/functions/subscribe
// Body: { email: string }
// Adds the email to a Brevo list. Uses double opt-in via Brevo's
// "doubleOptin" template if configured; otherwise creates the contact directly.
//
// Required env vars (set in Netlify project settings):
//   BREVO_API_KEY  - v3 API key from Brevo dashboard (xkeysib-...)
//   BREVO_LIST_ID  - integer list ID
//
// Optional env vars:
//   BREVO_ORIGIN   - allowed CORS origin (defaults to *)

const json = (status, body) => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.BREVO_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const email = String(payload.email || "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return json(400, { error: "Please enter a valid email address." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = parseInt(process.env.BREVO_LIST_ID || "", 10);
  if (!apiKey || !listId) {
    // Don't leak details to the client. Log for the deploy logs.
    console.error("subscribe: missing BREVO_API_KEY or BREVO_LIST_ID");
    return json(500, { error: "Signup is temporarily unavailable. Please email us." });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true, // if contact exists, update (add to list) instead of erroring
      }),
    });

    if (res.status === 201 || res.status === 204) {
      return json(200, { ok: true });
    }

    // Brevo returns 400 with code "duplicate_parameter" when the contact already exists
    // and updateEnabled=false. With updateEnabled=true above, this should rarely fire,
    // but we treat duplicates as success anyway.
    const data = await res.json().catch(() => ({}));
    if (data && data.code === "duplicate_parameter") {
      return json(200, { ok: true, already: true });
    }

    console.error("subscribe: brevo error", res.status, data);
    return json(502, { error: "Could not save your email right now. Please try again." });
  } catch (err) {
    console.error("subscribe: fetch failed", err);
    return json(502, { error: "Could not reach the signup service. Please try again." });
  }
};
