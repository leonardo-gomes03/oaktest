import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'

function Form({ addProduct }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    available: false
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    if(product.name != '' && product.price > 0){
      addProduct(product)

    }else if(product.price < 0){
      alert('O preço não pode ser negativo')
    }
    else{
      alert('Os seguintes campos são obrigatórios: Nome e Preço')
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.name}>
        <label htmlFor="name">Nome do Produto:</label>
        <input
          type="text"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>

      <div className={styles.description}>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>

      <div className={styles.price}>
        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>

      <div className={styles.available}>
        <label htmlFor="available">Tem disponivel?</label>
        <select
          id="available"
          value={product.available}
          onChange={(e) =>
            setProduct({ ...product, available: e.target.value })
          }
        >
          <option value={false}>Não</option>
          <option value={true}>Sim</option>
        </select>
      </div>

      <button className={styles.button} type="submit">Adicionar produto</button>
    </form>
  );
}

function ListProducts({ products }) {
  return (
    <>
      <table className={styles.list} >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {products
            .sort((a, b) => a.price - b.price)
            .map((product) => (
              <tr key={Math.floor(Math.random() * 10000)}>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const addProduct = (product) => {
    setProducts([...products, product]);
    setShowForm(false);
  };
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Oak Teste</h1>
      {showForm ? (
        <Form addProduct={addProduct} />
      ) : (
        <>
        <button className={styles.button} onClick={() => setShowForm(true)}>
          Adicionar outro produto
        </button>
        <ListProducts products={products} />
        </>
      )}
    </div>
  );
}
export default App;