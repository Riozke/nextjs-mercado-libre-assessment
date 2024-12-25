import {type Product, type Category} from "@/types";
import {SELLER_ID, API_URL} from "@/config";

export const getProducts = (category?: string) => {
  const url = new URL(`${API_URL}/sites/MLA/search`);

  if (!SELLER_ID) throw new Error("No seller id provided");

  url.searchParams.append("seller_id", SELLER_ID);

  if (category) url.searchParams.append("category", category);

  return fetch(url)
    .then((response) => response.json() as Promise<{results: Product[]}>)
    .then((res) => {
      return res.results;
    });
};

export const getCategories = async (products: Product[]) => {
  const ids = Array.from(new Set(products.map((product) => product.category_id)));

  const allProductsCategories = await Promise.all(
    ids.map((id) =>
      fetch(`https://api.mercadolibre.com/categories/${id}`)
        .then((res) => res.json() as Promise<{path_from_root: {id: string; name: string}[]}>)
        .then((res) => res.path_from_root),
    ),
  );

  const draft: Record<string, Category> = {};

  allProductsCategories.forEach((productCategories) => {
    productCategories.forEach((singleCategory, index) => {
      const {id} = singleCategory;
      const parent = productCategories[index - 1] as Category | undefined;

      const parentId = parent?.id ?? null;

      draft[id] = {...singleCategory, parentId};
    });
  });

  return Object.values(draft);
};
