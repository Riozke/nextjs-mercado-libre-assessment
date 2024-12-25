import Products from "@/components/Products";
import {getProducts} from "@/services";

export default async function ProductsPage({params = {}}: {params?: {segments?: string[]}}) {
  const category = Array.isArray(params.segments) ? params.segments[0] : undefined;

  const products = await getProducts(category);

  return <Products products={products} />;
}
