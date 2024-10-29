import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    IconButton
} from '@mui/material';
import StarRating from './components/StarRating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';


const DetailPage = () => {
    const location = useLocation();
    const { product } = location.state;
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(product.minimumOrderQuantity);

    const handleIncrement = () => {
        if (quantity < product.stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > product.minimumOrderQuantity) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };
    const reviewCount = product.reviews.length;

    const calculateDiscount = (price, discount) => {
        const discountAmount = (discount / 100) * price;
        
        const endPrice = price - discountAmount;
    
        return endPrice;
    };
    return (
        <Stack 
            justifyContent="flex-start" 
            alignItems="center" 
            style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#F0F0F0' }}
        >
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
                            Detail Product
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
            <Stack direction={'row'} gap={10} minWidth={'80vw'} marginTop={'50px'} justifyContent={'center'} padding={'25px'}>
                <Stack direction={'row'} padding={'25px'} width={'50%'}>
                    {/* Gambar */}
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <img
                            src={mainImage}
                            style={{ width: '250px', height: 'auto', marginBottom: '16px' }}
                            alt={product.title}
                        />
                        <Stack direction="row" spacing={1}>
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    onClick={() => handleThumbnailClick(image)}
                                    style={{
                                        width: '60px',
                                        height: 'auto',
                                        cursor: 'pointer',
                                        border: mainImage === image ? '2px solid #1976d2' : '2px solid transparent',
                                    }}
                                    alt={`${product.title} thumbnail ${index + 1}`}
                                />
                            ))}
                        </Stack>
                    </Stack>
                    <Stack direction={'column'} width={'100%'}>
                        <Typography variant="h3" color="textSecondary">{product.title}</Typography>
                            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                                <Stack gap="5px" direction="row" alignItems="center">
                                    <StarIcon sx={{ color: '#f59842' }} />
                                    <Typography>{product.rating}</Typography>
                                    <Typography>({reviewCount}) Review(s)</Typography>
                                </Stack>
                                <Stack>
                                    <Typography>{product.stock} Stock(s) left!</Typography>
                                </Stack>
                            </Stack>

                        <Typography variant="h3" color="textSecondary">${calculateDiscount(product.price, product.discountPercentage).toFixed(2)}</Typography>
                        <Stack direction={'row'} gap={2}>
                            <Typography sx={{ textDecoration: 'line-through' }} variant="h5" color="textSecondary">${product.price}</Typography>
                            <Typography variant="h6" color="textSecondary">{product.discountPercentage}% Off</Typography>
                        </Stack>
                        <Typography>{product.shippingInformation}</Typography>
                        <Typography>Minimum Order : {product.minimumOrderQuantity}</Typography>
                        <Typography>{product.returnPolicy} ({product.warrantyInformation})</Typography>
                        <Stack direction="column" alignItems="flex-end" style={{ marginTop: 'auto' }}>
                            <Typography color="textSecondary">{product.description || 'No description available.'}</Typography>
                        </Stack>
                    </Stack>  
                </Stack>
                <Stack minWidth={'300px'} direction={'column'} borderRadius={'5%'} border={'solid 1px black'} justifyContent={'space-between'} padding={2}>
                    <Stack>
                        <Typography>Input Quantity And Notes</Typography>
                        <Stack width="auto" direction="row" alignItems="center" spacing={1} padding={1}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleDecrement}
                                disabled={quantity === product.minimumOrderQuantity}
                                style={{
                                    minWidth: '32px',
                                    minHeight: '32px',
                                    borderRadius: '50%',
                                    padding: 0,
                                }}
                            >
                                -
                            </Button>
                            <Typography>{quantity}</Typography>                  
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleIncrement}
                                disabled={quantity === product.stock}
                                style={{
                                    minWidth: '32px',
                                    minHeight: '32px',
                                    borderRadius: '50%',
                                    padding: 0,
                                }}
                            >
                                +
                            </Button>
                        </Stack>
                        <Typography>Minimum Order {product.minimumOrderQuantity} pcs</Typography>
                    </Stack>
                    <Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack alignSelf={'flex-end'}>
                                <Typography>Total</Typography>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography sx={{ textDecoration: 'line-through' }} >${(product.price * quantity).toFixed(2)}</Typography>
                                <Typography>${(calculateDiscount(product.price, product.discountPercentage) * quantity).toFixed(2)}</Typography>
                            </Stack>
                        </Stack>
                        <IconButton
                            sx={{
                                backgroundColor: 'gray', 
                                color: 'white',        
                                padding: '8px 16px',      
                                borderRadius: '4px',      
                                '&:hover': {
                                    backgroundColor: 'darkgray', 
                                },
                            }}
                            aria-label="user profile"
                        >
                            <ShoppingCartIcon fontSize="large" sx={{ marginRight: 1 }} />
                            <Typography>Add To Cart</Typography>
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
            <Stack minWidth={'80vw'} marginTop={'50px'} padding={'25px'} height={'auto'} gap={'25px'}>
                <Typography variant="h5" color="textSecondary">Comments and Reviews : </Typography>
                {product.reviews.map((review, index) => (
                    <Stack borderRadius={'16px'} direction={'column'} key={index} spacing={1} padding={'10px'} border={'solid 1px black'}>
                        <Typography color="textSecondary">{review.reviewerName}</Typography>
                        <Typography color="textSecondary">{review.reviewerEmail}</Typography>
                        <StarRating rating={review.rating} />
                        <Typography color="textSecondary">{review.comment}</Typography>
                        <Typography color="textSecondary">
                            {review.date.slice(0, 10)}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}
export default DetailPage;