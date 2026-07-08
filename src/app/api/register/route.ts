import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://gray-rhinoceros-665056.hostingersite.com/graphql";

    // Standard WPGraphQL registerUser mutation
    // Note: WordPress requires a unique username. We will use the email address as the username.
    const registerMutation = `
      mutation RegisterUser($username: String!, $email: String!, $password: String!, $name: String!) {
        registerUser(input: {
          username: $username,
          email: $email,
          password: $password,
          displayName: $name
        }) {
          user {
            id
            databaseId
            email
            name
          }
        }
      }
    `;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: registerMutation,
        variables: {
          username: email,
          email: email,
          password: password,
          name: name,
        },
      }),
    });

    const json = await res.json();

    if (json.errors) {
      console.warn("WordPress registration error payload:", json.errors);
      return NextResponse.json(
        { error: json.errors[0]?.message || "Registrierung in WordPress fehlgeschlagen." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: json.data?.registerUser?.user,
    });

  } catch (err: any) {
    console.error("Server Register Route Failure:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
