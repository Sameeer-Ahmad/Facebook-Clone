import { Alert, AlertIcon, Button, Flex, Input, Spinner } from "@chakra-ui/react";
import ProductCard, { Product } from "./ProductCard";
import { fetchProductsSuccess, setError, setLoading } from "../../redux/ProductReducer/action";
import axios from "axios";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";





const Marcketing = () => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: any) => state.loading); 
    const error: string | null = useSelector((state: any) => state.error);
    const products: Product[] = useSelector((state: any) => state.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const fetchProducts = async (query: string) => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`https://dummyjson.com/products?q=${query}`);
        dispatch(fetchProductsSuccess(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setError("Error fetching products: " + error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchQuery(value);
    };

    const handleSearchButtonClick = () => {
      fetchProducts(searchQuery);
    };

    const handleSort = () => {
      setSortAscending(!sortAscending);
      const sortedProducts = [...products].sort((a, b) => {
        return sortAscending ? a.price - b.price : b.price - a.price;
      });
      dispatch(fetchProductsSuccess(sortedProducts));
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
      return (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Flex justify="center" align="center" height="100vh">
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Flex>
      );
    }

    return (
      <>
        <Flex alignItems="center" justify="space-between" p={4} borderWidth="1px" borderRadius="lg">
          <Input 
            placeholder="Search...." 
            flex="1" 
            mr={2} 
            value={searchQuery} 
            onChange={handleSearchInputChange} 
          />
          <Button colorScheme="teal" variant="solid" size="sm" mr={2} onClick={handleSearchButtonClick}>
            Search
          </Button>
          <Button colorScheme="teal" variant="solid" size="sm" onClick={handleSort}>
            {sortAscending ? 'Sort High to Low' : 'Sort Low to High'}
          </Button>
        </Flex>
        {currentProducts.length === 0 && (
          <Flex justify="center" mt={4}>
            <p>No result found</p>
          </Flex>
        )}
        <Flex flexWrap="wrap" justifyContent="space-around" p={4} gap={"10px"}>
          {currentProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Flex>
        <Flex justifyContent="center" mt={4}>
          <Button colorScheme="teal" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </Button>
          <Button colorScheme="teal" ml={2} onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= products.length}>
            Next
          </Button>
        </Flex>
      </>
    );
  };

export default Marcketing;