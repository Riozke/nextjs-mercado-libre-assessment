import {type Product} from "@/types";

export default function Products({products}: {products: Product[]}) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {products.map(({id, thumbnail, title, permalink, price, currency_id: currencyId}) => (
        <li key={id}>
          <a
            href={permalink}
            rel="noopener noreferrer"
            target="_blank"
            title="Ir a la pagina de mercado libre"
          >
            <img alt={title} src={thumbnail} />
            <h3>{title}</h3>
            <strong>
              {price.toLocaleString("es-AR", {
                currency: currencyId,
                style: "currency",
              })}
            </strong>
          </a>
        </li>
      ))}
    </ul>
  );
}
