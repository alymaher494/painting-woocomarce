const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://gray-rhinoceros-665056.hostingersite.com/graphql";

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // Cache and revalidate query every 60 seconds
    });

    const json = await res.json();
    if (json.errors) {
      console.warn("GraphQL Errors:", json.errors);
      return null;
    }
    return json.data;
  } catch (err) {
    console.warn("Headless API Fetch Error (WordPress connection bypassed):", err);
    return null;
  }
}

// 1. Fetch ACF Homepage slider settings
export async function getHomepageSettings() {
  const data = await fetchAPI(`
    query GetHomepageSettings {
      page(id: "home", idType: URI) {
        homepageSettings {
          heroTitle
          heroDescription
          heroSlides {
            mediaItemUrl
          }
        }
      }
    }
  `);
  return data?.page?.homepageSettings || null;
}

// 2. Fetch WooCommerce Products list
export async function getWooProducts() {
  const data = await fetchAPI(`
    query GetWooProducts {
      products(first: 20) {
        nodes {
          id
          databaseId
          name
          slug
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
          }
        }
      }
    }
  `);
  return data?.products?.nodes || null;
}
