import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const consumerKey = process.env.WC_CONSUMER_KEY || "ck_placeholder_key";
    const consumerSecret = process.env.WC_CONSUMER_SECRET || "cs_placeholder_secret";

    // WooCommerce REST API endpoint for creating customers
    const wcApiUrl = "https://gray-rhinoceros-665056.hostingersite.com/wp-json/wc/v3/customers";

    // Split name into first/last
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Prepare WooCommerce customer payload
    const customerData = {
      email,
      first_name: firstName,
      last_name: lastName,
      username: email,
      password,
      billing: {
        first_name: firstName,
        last_name: lastName,
        email,
        country: "DE",
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        country: "DE",
      },
    };

    // Authenticate using Basic Auth with WooCommerce Consumer Keys
    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const res = await fetch(wcApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(customerData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn("WooCommerce Customer Registration Error:", data);
      // WooCommerce returns a readable message for common issues like duplicate emails
      const errorMessage =
        data.message || "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.id,
        email: data.email,
        name: `${data.first_name} ${data.last_name}`.trim(),
      },
    });
  } catch (err: any) {
    console.error("Server Register Route Failure:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
