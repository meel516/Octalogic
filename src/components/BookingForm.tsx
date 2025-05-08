import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paper, Box, Typography, Button } from "@mui/material";
import { ChevronRight } from "lucide-react";
import NameStep from "./steps/NameStep";
import WheelsStep from "./steps/WheelsStep";
import VehicleTypeStep from "./steps/VehicleTypeStep";
import VehicleModelStep from "./steps/VehicleModelStep";
import DateRangeStep from "./steps/DateRangeStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { BookingFormData } from "../types/booking";

// Animation variants for form steps
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const BookingForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    wheels: null,
    vehicleTypeId: null,
    vehicleId: null,
    dateRange: {
      startDate: null,
      endDate: null,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Form validation for each step
  const isStepValid = () => {
    switch (step) {
      case 0: // Name step
        return (
          formData.firstName.trim() !== "" && formData.lastName.trim() !== ""
        );
      case 1: // Wheels step
        return formData.wheels !== null;
      case 2: // Vehicle type step
        return formData.vehicleTypeId !== null;
      case 3: // Vehicle model step
        return formData.vehicleId !== null;
      case 4: // Date range step
        return (
          formData.dateRange.startDate !== null &&
          formData.dateRange.endDate !== null
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;

    setDirection(1);
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prevStep) => prevStep - 1);
  };

  // Update form data
  const updateFormData = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      wheels: null,
      vehicleTypeId: null,
      vehicleId: null,
      dateRange: {
        startDate: null,
        endDate: null,
      },
    });
    setStep(0);
    setDirection(0);
    setBookingSuccess(false);
    setBookingError(null);
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <NameStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <WheelsStep
            wheels={formData.wheels}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <VehicleTypeStep
            wheels={formData.wheels as number}
            vehicleTypeId={formData.vehicleTypeId}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <VehicleModelStep
            vehicleTypeId={formData.vehicleTypeId as number}
            vehicleId={formData.vehicleId}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <DateRangeStep
            dateRange={formData.dateRange}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <ConfirmationStep
            formData={formData}
            isSubmitting={isSubmitting}
            bookingSuccess={bookingSuccess}
            bookingError={bookingError}
            resetForm={resetForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", maxWidth: 600, overflow: "hidden" }}
    >
      <Box p={4}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Vehicle Rental Booking
        </Typography>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Box minHeight={300}>{renderStep()}</Box>
          </motion.div>
        </AnimatePresence>

        {step < 5 && (
          <Box
            display="flex"
            justifyContent={step > 0 ? "space-between" : "flex-end"}
            mt={4}
          >
            {step > 0 && (
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              endIcon={<ChevronRight size={18} />}
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {step === 4 ? "Submit" : "Next"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default BookingForm;
