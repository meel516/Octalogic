import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import dayjs from "dayjs";
import { BookingFormData, Vehicle, BookingResponse } from "../../types/booking";
import { Check, RefreshCw } from "lucide-react";

interface ConfirmationStepProps {
  formData: BookingFormData;
  isSubmitting: boolean;
  bookingSuccess: boolean;
  bookingError: string | null;
  resetForm: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  formData,
  isSubmitting,
  bookingSuccess,
  bookingError,
  resetForm,
}) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingResponse, setBookingResponse] =
    useState<BookingResponse | null>(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!formData.vehicleId) return;

      try {
        setLoading(true);
        // This would be replaced with an actual API call to get vehicle details
        // For now, we'll simulate it
        setTimeout(() => {
          // Mock vehicle data until we connect to backend
          const mockVehicle = {
            id: formData.vehicleId,
            make: "Honda",
            model: "Civic",
            year: 2023,
            color: "Silver",
            dailyRate: 50.0,
            licensePlate: "ABC-1234",
          };

          setVehicle(mockVehicle as Vehicle);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [formData.vehicleId]);

  const handleSubmit = async () => {
    if (
      !formData.vehicleId ||
      !formData.dateRange.startDate ||
      !formData.dateRange.endDate
    ) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post("http://localhost:4000/api/bookings", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleId,
        startDate: formData.dateRange.startDate.toISOString(),
        endDate: formData.dateRange.endDate.toISOString(),
      });

      setBookingResponse(response.data);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      if (axios.isAxiosError(error) && error.response) {
        setBookingError(
          error.response.data.error || "Failed to create booking"
        );
      } else {
        setBookingError("Failed to create booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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

  if (bookingSuccess && bookingResponse) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center" p={3}>
          <Box
            sx={{
              backgroundColor: "success.light",
              borderRadius: "50%",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}
          >
            <Check size={40} color="white" />
          </Box>

          <Typography variant="h5" gutterBottom>
            Booking Confirmed!
          </Typography>

          <Typography variant="body1" paragraph>
            Thank you for your booking, {formData.firstName}! Your rental has
            been confirmed.
          </Typography>

          <Box
            mt={4}
            p={3}
            bgcolor="background.paper"
            borderRadius={2}
            boxShadow={1}
          >
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="textSecondary">
                Vehicle:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {bookingResponse.vehicle.make} {bookingResponse.vehicle.model}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="textSecondary">
                Dates:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {dayjs(bookingResponse.booking.startDate).format("MMM D, YYYY")}{" "}
                - {dayjs(bookingResponse.booking.endDate).format("MMM D, YYYY")}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="textSecondary">
                Duration:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {bookingResponse.rentalDuration} days
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="textSecondary">
                Total Price:
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                ${bookingResponse.booking.totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            startIcon={<RefreshCw size={16} />}
            onClick={resetForm}
            sx={{ mt: 4 }}
          >
            Make Another Booking
          </Button>
        </Box>
      </motion.div>
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
          Confirm your booking
        </Typography>

        {bookingError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {bookingError}
          </Alert>
        )}

        <Box
          mt={3}
          p={3}
          bgcolor="background.paper"
          borderRadius={2}
          boxShadow={1}
        >
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Personal Information
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="textSecondary">
              Name:
            </Typography>
            <Typography variant="body2">
              {formData.firstName} {formData.lastName}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Vehicle Information
          </Typography>

          {vehicle && (
            <>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Vehicle:
                </Typography>
                <Typography variant="body2">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Color:
                </Typography>
                <Typography variant="body2">{vehicle.color}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="textSecondary">
                  License Plate:
                </Typography>
                <Typography variant="body2">{vehicle.licensePlate}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Daily Rate:
                </Typography>
                <Typography variant="body2">
                  ${vehicle.dailyRate.toFixed(2)}/day
                </Typography>
              </Box>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Rental Period
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="textSecondary">
              Start Date:
            </Typography>
            <Typography variant="body2">
              {formData.dateRange.startDate?.format("MMM D, YYYY")}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="textSecondary">
              End Date:
            </Typography>
            <Typography variant="body2">
              {formData.dateRange.endDate?.format("MMM D, YYYY")}
            </Typography>
          </Box>

          {formData.dateRange.startDate &&
            formData.dateRange.endDate &&
            vehicle && (
              <>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="textSecondary">
                    Duration:
                  </Typography>
                  <Typography variant="body2">
                    {formData.dateRange.endDate.diff(
                      formData.dateRange.startDate,
                      "day"
                    )}{" "}
                    days
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="textSecondary">
                    Estimated Total:
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    $
                    {(
                      formData.dateRange.endDate.diff(
                        formData.dateRange.startDate,
                        "day"
                      ) * vehicle.dailyRate
                    ).toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{ minWidth: 200 }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ConfirmationStep;
