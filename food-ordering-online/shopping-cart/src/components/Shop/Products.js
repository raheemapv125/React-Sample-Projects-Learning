import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {id : 'p1' ,
   title : 'My First Book' ,
    price : 10 ,
    description :'This is a first product - amazing!'} ,
    {id : 'p2' ,
    title : 'My second Book' ,
    price : 20 ,
    description :'This is a first product - amazing!'} ,
    {id : 'p3' ,
    title : 'My third Book' ,
    price : 30 ,
    description :'This is a first product - amazing!'} ,

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (
          <ProductItem key = {product.id}
            title = {product.title}
            price = {product.price}
            description = {product.description}
            item = {product}
        />
        ))}

      </ul>
    </section>
  );
};

export default Products;
