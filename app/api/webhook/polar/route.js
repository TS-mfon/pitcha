import { webhooks } from "@polar-sh/sdk/2026-10";

// POST /api/webhook/polar
// Webhook receiver for Polar events with signature verification
export async function POST(request) {
  try {
    // 1. Verify that webhook secret is configured server-side
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("[POLAR WEBHOOK ERROR] POLAR_WEBHOOK_SECRET is missing");
      return Response.json(
        { error: "POLAR_WEBHOOK_SECRET is not configured in .env.local" },
        { status: 500 }
      );
    }

    // 2. Read raw unmodified request body as string
    const rawBody = await request.text();

    // 3. Extract Standard Webhook headers sent by Polar
    const headers = {
      "webhook-id": request.headers.get("webhook-id") || "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") || "",
      "webhook-signature": request.headers.get("webhook-signature") || "",
    };

    // 4. Validate webhook signature using Polar SDK
    let event;
    try {
      event = await webhooks.validateEvent(rawBody, headers, webhookSecret);
    } catch (err) {
      if (err instanceof webhooks.PolarWebhookVerificationError) {
        console.warn("[POLAR WEBHOOK] Invalid signature detected:", err.message);
        return Response.json(
          { error: "Invalid webhook signature" },
          { status: 403 }
        );
      }
      if (err instanceof webhooks.PolarWebhookUnknownTypeError) {
        console.warn("[POLAR WEBHOOK] Unsupported signed event type:", err.eventType);
        return Response.json({ received: true, note: "Unknown event acknowledged" }, { status: 202 });
      }
      return Response.json(
        { error: "Malformed webhook payload" },
        { status: 400 }
      );
    }

    // 5. Handle and log verified events
    console.log(`[POLAR WEBHOOK] Verified event received: ${event.type}`);

    // Specifically handle and log order.paid events as requested
    if (event.type === "order.paid" || event.type === "order.created") {
      const orderData = event.data || {};
      console.log("💰 [POLAR WEBHOOK] order.paid event detected!");
      console.log(`- Order ID: ${orderData.id}`);
      console.log(`- Customer: ${orderData.customer?.email || orderData.customer_id || "N/A"}`);
      console.log(`- Amount: ${orderData.total_amount || orderData.amount || "N/A"} ${orderData.currency || "USD"}`);
      console.log(`- Status: ${orderData.status || "paid"}`);
    } else if (event.type === "checkout.updated" && event.data?.status === "succeeded") {
      console.log(`💳 [POLAR WEBHOOK] checkout.updated: payment succeeded for checkout ${event.data.id}`);
    }

    // 6. Return 200 OK to acknowledge delivery
    return Response.json(
      { received: true, type: event.type },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POLAR WEBHOOK UNEXPECTED ERROR]:", error);
    return Response.json(
      { error: error.message || "Internal webhook error" },
      { status: 500 }
    );
  }
}
