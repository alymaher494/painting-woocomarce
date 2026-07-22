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
          ... on ProductWithPricing {
            price
          }
        }
      }
    }
  `);
  return data?.products?.nodes || null;
}

// 3. Fetch WooCommerce Categories list
export async function getWooCategories() {
  const data = await fetchAPI(`
    query GetWooCategories {
      productCategories(first: 20) {
        nodes {
          id
          name
          slug
          description
        }
      }
    }
  `);
  return data?.productCategories?.nodes || null;
}

// 4. Fetch single WooCommerce Category by slug
export async function getWooCategoryBySlug(slug: string) {
  const data = await fetchAPI(`
    query GetCategoryBySlug($slug: [String]) {
      productCategories(where: { slug: $slug }) {
        nodes {
          id
          name
          slug
          description
          image {
            sourceUrl
          }
        }
      }
    }
  `, { variables: { slug: [slug] } });
  return data?.productCategories?.nodes?.[0] || null;
}

// 5. Fetch WooCommerce Products filtered by category slug
export async function getWooProductsByCategory(categorySlug: string) {
  const data = await fetchAPI(`
    query GetProductsByCategory($category: String!) {
      products(first: 20, where: { category: $category }) {
        nodes {
          id
          databaseId
          name
          slug
          description
          image {
            sourceUrl
          }
          ... on ProductWithPricing {
            price
          }
        }
      }
    }
  `, { variables: { category: categorySlug } });
  return data?.products?.nodes || null;
}
