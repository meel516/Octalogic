import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { Vehicle } from "../../types/booking";

interface VehicleModelStepProps {
  vehicleTypeId: number | null;
  vehicleId: number | null;
  updateFormData: (data: {
    vehicleId: number | null;
    selectedVehicle?: Vehicle;
  }) => void;
}

const VehicleModelStep: React.FC<VehicleModelStepProps> = ({
  vehicleTypeId,
  vehicleId,
  updateFormData,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!vehicleTypeId) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/vehicles/by-type/${vehicleTypeId}`
        );
        setVehicles(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [vehicleTypeId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedVehicle = vehicles.find((v) => v.id === selectedId);
    updateFormData({ vehicleId: selectedId, selectedVehicle });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
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
          Select a vehicle
        </Typography>

        <Typography variant="body2" color="textSecondary" paragraph>
          Choose the specific model you want to rent
        </Typography>

        {vehicles.length === 0 ? (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            No vehicles available for this type.
          </Typography>
        ) : (
          <FormControl
            component="fieldset"
            fullWidth
            error={vehicleId === null}
          >
            <RadioGroup
              aria-label="vehicle-model"
              name="vehicle-model"
              value={vehicleId}
              onChange={handleChange}
            >
              <Box display="flex" flexDirection="column" gap={3} mt={2}>
                {vehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Box
                      p={2}
                      border={1}
                      borderColor={
                        vehicleId === vehicle.id ? "primary.main" : "grey.300"
                      }
                      borderRadius={2}
                      bgcolor={
                        vehicleId === vehicle.id
                          ? "primary.50"
                          : "background.paper"
                      }
                      display="flex"
                      flexDirection={{ xs: "column", sm: "row" }}
                      gap={2}
                    >
                      {vehicle.imageUrl && (
                        <Box
                          component="img"
                          src={vehicle.imageUrl}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          sx={{
                            width: { xs: "100%", sm: 120 },
                            height: { xs: 140, sm: 80 },
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                      )}

                      <Box flexGrow={1}>
                        <FormControlLabel
                          value={vehicle.id}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="body1" fontWeight={500}>
                                {vehicle.make} {vehicle.model} ({vehicle.year})
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {vehicle.color} • ${vehicle.dailyRate}/day
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                License: {vehicle.licensePlate}
                              </Typography>
                            </Box>
                          }
                          sx={{ margin: 0, alignItems: "flex-start" }}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </RadioGroup>
            {vehicleId === null && (
              <FormHelperText>Please select a vehicle</FormHelperText>
            )}
          </FormControl>
        )}
      </motion.div>
    </Box>
  );
};

export default VehicleModelStep;
