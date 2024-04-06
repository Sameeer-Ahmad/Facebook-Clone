import { Alert, AlertIcon, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";


import axios from "axios";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard, { Product } from "./productcard";
import { fetchProductsSuccess, setError, setLoading } from "../../redux/ProductReducer/action";






const Marcketing = () => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state: any) => state.loading); 
    const error: string | null = useSelector((state: any) => state.error);
    const products: Product[] = useSelector((state: any) => state.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const allProducts: Product[] = useSelector((state: { products: Product[] }) => state.products);
    const productsPerPage = 12;
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);


    useEffect(() => {
      fetchAllProducts();
    }, []);
  
    const fetchAllProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`https://json-server-moc-4.onrender.com/product`);
        dispatch(fetchProductsSuccess(response.data));
        setFilteredProducts(response.data);
        console.log("data",response.data);
        
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setError("Error fetching products: " + error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const fetchFilteredProducts = () => {
      const filtered = allProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredProducts(filtered);
      setCurrentPage(1);
    };
  
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchQuery(value);
    };

    const handleSearchButtonClick = () => {
      fetchFilteredProducts();
    };

    const handleSort = () => {
      setSortAscending(!sortAscending);
      const sortedProducts = [...filteredProducts].sort((a, b) => {
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
          <Text ml={2} fontWeight={"bold"} fontSize={"35px"}>Today's Picks</Text>
          <Input 
            placeholder="Search...." 
            maxWidth={"250px"}
            flex="1" 
            mr={2} 
            marginLeft={"auto"}
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
        <Flex flexWrap="wrap" justifyContent="space-around" p={4} gap={"20px"}>
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