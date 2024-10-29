import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Button,
    Typography,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from '@mui/material';
import CustomButton from "./components/CustomButton";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ChairIcon from '@mui/icons-material/Chair';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products', {
                    headers: { 'Content-Type': 'application/json' },
                });
                setProducts(response.data.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleCardClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const calculateDiscount = (price, discount) => {
        const discountAmount = (discount / 100) * price;
        
        const endPrice = price - discountAmount;
    
        return endPrice.toFixed(2);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Stack bgcolor={'#F0F0F0'} spacing={2} alignItems="center" style={{ minHeight: '100vw', width: '100vw' }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                bgcolor="white"
                width="100%"
                padding="20px"
                style={{ color: '#757575' }}
            >
                <Stack paddingLeft="350px">
                    <Typography variant="h4" fontWeight="bold">
                        Product Catalog
                    </Typography>
                </Stack>
                <Stack paddingRight="350px" direction={'row'}>
                    <IconButton color="gray" aria-label="user profile">
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="gray" aria-label="user profile">
                        <ShoppingCartIcon fontSize="large" />
                    </IconButton>
                </Stack>
            </Stack>
            <Stack width={'auto'} gap={'20px'}>
                <Typography fontWeight={700} color="#88BDBC" variant="h5" style={{ textAlign: 'left'}}>
                    Show By Category
                </Typography>
                <Stack direction={'row'} gap={'20px'} justifyContent={'space-between'}>
                    <CustomButton 
                        icon={FaceRetouchingNaturalIcon} 
                        text="Beauty" 
                        onClick={() => setSelectedCategory('beauty')} 
                    />
                    <CustomButton 
                        icon={LocalFloristIcon} 
                        text="Fragrances" 
                        onClick={() => setSelectedCategory('fragrances')} 
                    />
                    <CustomButton 
                        icon={ChairIcon} 
                        text="Furniture" 
                        onClick={() => setSelectedCategory('furniture')} 
                    />
                    <CustomButton 
                        icon={LocalGroceryStoreIcon} 
                        text="Groceries" 
                        onClick={() => setSelectedCategory('groceries')} 
                    />
                    <CustomButton 
                        icon={MenuIcon} 
                        text="All" 
                        onClick={() => setSelectedCategory()} 
                    />
                </Stack>
                <Typography fontWeight={700} color="#88BDBC" variant="h5" style={{ textAlign: 'left'}}>
                    Products
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    {currentProducts.map(product => (
                        <Card
                            key={product.id}
                            sx={{ display: 'flex', width:'300px', minHeight: '500px', cursor: 'pointer' }}
                            onClick={() => handleCardClick(product)}
                        >
                            <CardContent>
                                <Stack direction="column" sx={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
                                    <Stack>
                                        <Stack style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src={product.thumbnail}
                                                style={{ width: '100%', height: 'auto' }}
                                                alt={product.title}
                                            />
                                        </Stack>
                                        <Typography color="textSecondary">({product.brand}) {product.title}</Typography>
                                    </Stack>
                                    <Stack direction="column" gap="5px" style={{ marginTop: 'auto' }}>
                                        <Stack direction="row" gap="10px">
                                            <Typography color="textSecondary">${calculateDiscount(product.price, product.discountPercentage)}</Typography>
                                            <Typography sx={{ textDecoration: 'line-through' }} color="textSecondary">${product.price}</Typography>
                                        </Stack>
                                        <Stack gap="5px" direction="row" alignItems="center">
                                            <StarIcon sx={{ color: '#f59842' }} />
                                            {product.rating}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <Stack direction="row" justifyContent={"flex-end"} spacing={2} style={{ marginTop: '20px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        Back
                    </Button>
                    <Typography>Page {currentPage} of {totalPages}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </Stack>
            </Stack> 
        </Stack>
    );
}

export default HomePage;
