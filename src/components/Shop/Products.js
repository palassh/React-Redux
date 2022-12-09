import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "My First Car",
    price: 10,
    description: "This is my first car",
  },
  {
    id: "p2",
    title: "My Second Car",
    price: 20,
    description: "This is my second car",
  },
  {
    id: "p3",
    title: "My Third Car",
    price: 30,
    description: "This is my third car",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((products) => (
          <ProductItem
            key={products.id}
            title={products.title}
            price={products.price}
            description={products.description}
            id={products.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
