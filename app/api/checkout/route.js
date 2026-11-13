import { getPolarClient } from "@/lib/polar";

// POST /api/checkout
// Creates a Polar sandbox checkout session for the Pro tier.
export async function POST(request) {
  try {
    // 1. Verify required environment variables
    const accessToken = process.env.POLAR_ACCESS_TOKEN;
    if (!accessToken) {
      return Response.json(
        { error: "POLAR_ACCESS_TOKEN is not configured in .env.local" },
        { status: 500 }
      );
    }

    const productId = process.env.POLAR_PRODUCT_ID;
    if (!productId) {
      return Response.json(
        { error: "POLAR_PRODUCT_ID is not configured in .env.local" },
        { status: 500 }
      );
    }

    // 2. Resolve base application URL for success and return redirects
    const hostHeader = request.headers.get("host");
    const protoHeader = request.headers.get("x-forwarded-proto") || "http";
    const fallbackOrigin = hostHeader ? `${protoHeader}://${hostHeader}` : "http://localhost:3000";
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || fallbackOrigin).replace(/\/$/, "");

    // 3. Initialize Polar client (sandbox mode)
    const polar = getPolarClient();

    // 4. Create checkout session using Polar SDK
    // In @polar-sh/sdk v1.1.0, products accepts an array of product IDs
    const checkout = await polar.checkouts.create({
      products: [productId],
      success_url: `${appUrl}/success?checkout_id={CHECKOUT_ID}`,
      return_url: `${appUrl}/`,
    });

    if (!checkout || !checkout.url) {
      return Response.json(
        { error: "Polar did not return a valid checkout URL" },
        { status: 500 }
      );
    }

    // 5. Return checkout URL
    return Response.json({ url: checkout.url }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
