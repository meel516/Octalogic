import React, { useEffect, useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { VehicleType } from '../../types/booking';

interface VehicleTypeStepProps {
  wheels: number;
  vehicleTypeId: number | null;
  updateFormData: (data: { vehicleTypeId: number | null }) => void;
}

const VehicleTypeStep: React.FC<VehicleTypeStepProps> = ({ wheels, vehicleTypeId, updateFormData }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/types?wheels=${wheels}`);
        setVehicleTypes(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching vehicle types:', err);
        setError('Failed to load vehicle types. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [wheels]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ vehicleTypeId: parseInt(event.target.value, 10) });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" color="error.main" p={3}>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom>
          Type of vehicle
        </Typography>
        
        <Typography variant="body2" color="textSecondary" paragraph>
          Select the category of vehicle you want to rent
        </Typography>
        
        {vehicleTypes.length === 0 ? (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            No vehicle types available for {wheels} wheels.
          </Typography>
        ) : (
          <FormControl component="fieldset" fullWidth error={vehicleTypeId === null}>
            <RadioGroup
              aria-label="vehicle-type"
              name="vehicle-type"
              value={vehicleTypeId}
              onChange={handleChange}
            >
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                {vehicleTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Box 
                      p={2} 
                      border={1} 
                      borderColor={vehicleTypeId === type.id ? 'primary.main' : 'grey.300'} 
                      borderRadius={2}
                      bgcolor={vehicleTypeId === type.id ? 'primary.50' : 'background.paper'}
                    >
                      <FormControlLabel 
                        value={type.id} 
                        control={<Radio />} 
                        label={
                          <Box>
                            <Typography variant="body1" fontWeight={500}>{type.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{type.description}</Typography>
                          </Box>
                        } 
                      />
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </RadioGroup>
            {vehicleTypeId === null && <FormHelperText>Please select a vehicle type</FormHelperText>}
          </FormControl>
        )}
      </motion.div>
    </Box>
  );
};

export default VehicleTypeStep;