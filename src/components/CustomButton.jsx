import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

const CustomButton = ({ icon: Icon, text, onClick }) => {
    return (
        <Button 
            onClick={onClick} 
            variant="contained" 
            color="transparent"
            sx={{ minWidth: '200px', minHeight: '200px', padding: '8px 16px', textTransform: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <Stack paddingY={5} height={'100%'} direction="column" alignItems="center" justifyContent={'space-between'}>
                <Icon style={{ fontSize: 100, marginBottom: '4px', color: '#88BDBC'}} />
                <Typography variant='h6' color='#88BDBC'>{text}</Typography>
            </Stack>
        </Button>
    );
};

export default CustomButton;
