import { getPolarClient } from "@/lib/polar";

// GET /api/verify?checkout_id=...
// Verifies whether a Polar sandbox checkout has been completed and paid.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const checkoutId = searchParams.get("checkout_id");

    // 1. Validate checkout_id parameter
    if (!checkoutId || !checkoutId.trim()) {
      return Response.json(
        { paid: false, error: "checkout_id query parameter is required" },
        { status: 400 }
      );
    }

    // 2. Verify Polar access token
    const accessToken = process.env.POLAR_ACCESS_TOKEN;
    if (!accessToken) {
      return Response.json(
        { paid: false, error: "POLAR_ACCESS_TOKEN is not configured in .env.local" },
        { status: 500 }
      );
    }

    // 3. Initialize Polar client (sandbox mode)
    const polar = getPolarClient();

    // 4. Retrieve checkout session from Polar API
    try {
      const checkout = await polar.checkouts.get(checkoutId.trim());

      // In Polar, status "succeeded" indicates payment was performed successfully
      const isPaid = checkout && checkout.status === "succeeded";

      return Response.json(
        {
          paid: Boolean(isPaid),
          status: checkout?.status || "unknown",
        },
        { status: 200 }
      );
    } catch (polarError) {
      // If the checkout is not found, expired, or invalid on Polar
      return Response.json(
        {
          paid: false,
          status: "failed",
          error: polarError.message || "Checkout session not found on Polar",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      { paid: false, error: error.message || "Failed to verify checkout" },
      { status: 500 }
    );
  }
}
