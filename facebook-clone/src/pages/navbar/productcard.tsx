
import { Box, Image, Badge,  } from '@chakra-ui/react';
import Nav from '../../components/Navbar';



export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  location:string;
  seller:string
  imageArr: string[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <>
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" width={"250px"} height={"300px"} >
      <Image src={product.imageArr[0]} alt={product.title} height={"200px"} overflow={"hidden"} width={"100%"}/>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {/* {product.category} */}
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {product.title}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            ${product.price}
          </Box>
        </Box>
      </Box>
    </Box>
    
    </>
  );
};

export default ProductCard;




// shorting, filtering, paginations, debouncing, 


