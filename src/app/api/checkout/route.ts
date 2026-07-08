import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, address, paymentMethod } = body;

    const consumerKey = process.env.WC_CONSUMER_KEY || "ck_placeholder_key";
    const consumerSecret = process.env.WC_CONSUMER_SECRET || "cs_placeholder_secret";
    
    // WooCommerce REST API endpoint for creating orders
    const wcApiUrl = "https://gray-rhinoceros-665056.hostingersite.com/wp-json/wc/v3/orders";

    // Format line items for WooCommerce
    // Note: WooCommerce expects product database IDs (e.g. 123) rather than base64 GraphQL hashes.
    // If the client item contains a databaseId, we map it, otherwise fallback to a default test product ID (e.g. 99)
    const lineItems = items.map((item: any) => {
      // Extract numbers from id or fallback to databaseId
      const cleanDbId = item.databaseId || parseInt(item.id.replace(/[^0-9]/g, "") || "99");
      return {
        product_id: cleanDbId,
        quantity: item.config.quantity,
        subtotal: String(item.pricing.net),
        total: String(item.pricing.net),
        meta_data: [
          { key: "Material", value: item.config.material },
          { key: "Format", value: `${item.config.width}x${item.config.height} cm` },
          { key: "Staffeltarif-Netto", value: `${item.pricing.net.toFixed(2)} €` },
          { key: "Upload-Asset", value: item.uploadFile || "Kein Anhang" }
        ]
      };
    });

    // Prepare WooCommerce payload
    const orderData = {
      payment_method: paymentMethod,
      payment_method_title: paymentMethod === "paypal" ? "PayPal Headless Connect" : "Klarna / Card Connect",
      status: "processing",
      billing: {
        first_name: address.firstName,
        last_name: address.lastName,
        address_1: address.street,
        city: address.city,
        postcode: address.zip,
        country: "DE",
        email: address.email,
        company: address.company || ""
      },
      shipping: {
        first_name: address.firstName,
        last_name: address.lastName,
        address_1: address.street,
        city: address.city,
        postcode: address.zip,
        country: "DE",
        company: address.company || ""
      },
      line_items: lineItems,
      meta_data: [
        { key: "ust_id_nr", value: address.ustId || "" }
      ]
    };

    // Authenticate and post using Basic Auth header
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const response = await fetch(wcApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authString}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn("WooCommerce API Error Response:", data);
      return NextResponse.json(
        { error: data.message || "Failed to push order to WooCommerce" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: data.id,
      orderKey: data.order_key
    });

  } catch (err: any) {
    console.error("Server Checkout Route Failure:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
