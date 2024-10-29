import { Stack } from '@mui/material';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';

const StarRating = ({ rating }) => {
    return (
        <Stack direction="row">
            {Array.from({ length: 5 }, (_, index) => (
                index < rating ? <Star key={index} color="primary" /> : <StarBorder key={index} />
            ))}
        </Stack>
    );
};

export default StarRating;