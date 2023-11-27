import { products as initialProducts } from "./mocks/products.json"
import { Products } from "./components/Products"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { useFilters } from "./hooks/useFilter"
import { Cart } from "./components/Cart"
import { CarProvider } from "./context/cart"

function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CarProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </CarProvider>
  )
}

export default App
