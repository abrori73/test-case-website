import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

const CustomButton = ({ icon: Icon, text, onClick }) => {
    return (
        <Button 
            onClick={onClick} 
            variant="contained" 
            color="transparent"
            sx={{ padding: '8px 16px', textTransform: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <Stack direction="column" alignItems="center">
                <Icon style={{ fontSize: 70, marginBottom: '4px', color: '#88BDBC'}} />
                <Typography color='#88BDBC' variant="button">{text}</Typography>
            </Stack>
        </Button>
    );
};

export default CustomButton;
