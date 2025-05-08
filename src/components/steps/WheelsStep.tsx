import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText } from '@mui/material';
import { motion } from 'framer-motion';

interface WheelsStepProps {
  wheels: number | null;
  updateFormData: (data: { wheels: number }) => void;
}

const WheelsStep: React.FC<WheelsStepProps> = ({ wheels, updateFormData }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ wheels: parseInt(event.target.value, 10) });
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom>
          Number of wheels
        </Typography>
        
        <Typography variant="body2" color="textSecondary" paragraph>
          Select the type of vehicle you want to rent
        </Typography>
        
        <FormControl component="fieldset" fullWidth error={wheels === null}>
          <RadioGroup
            aria-label="wheels"
            name="wheels"
            value={wheels}
            onChange={handleChange}
          >
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box 
                  p={2} 
                  border={1} 
                  borderColor={wheels === 2 ? 'primary.main' : 'grey.300'} 
                  borderRadius={2}
                  bgcolor={wheels === 2 ? 'primary.50' : 'background.paper'}
                >
                  <FormControlLabel 
                    value={2} 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={500}>2 Wheels</Typography>
                        <Typography variant="body2" color="textSecondary">Motorcycles, Scooters</Typography>
                      </Box>
                    } 
                  />
                </Box>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box 
                  p={2} 
                  border={1} 
                  borderColor={wheels === 4 ? 'primary.main' : 'grey.300'} 
                  borderRadius={2}
                  bgcolor={wheels === 4 ? 'primary.50' : 'background.paper'}
                >
                  <FormControlLabel 
                    value={4} 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={500}>4 Wheels</Typography>
                        <Typography variant="body2" color="textSecondary">Cars, SUVs, Sedans</Typography>
                      </Box>
                    }
                  />
                </Box>
              </motion.div>
            </Box>
          </RadioGroup>
          {wheels === null && <FormHelperText>Please select a wheel type</FormHelperText>}
        </FormControl>
      </motion.div>
    </Box>
  );
};

export default WheelsStep;