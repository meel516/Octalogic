import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface NameStepProps {
  firstName: string;
  lastName: string;
  updateFormData: (data: { firstName: string, lastName: string }) => void;
}

const NameStep: React.FC<NameStepProps> = ({ firstName, lastName, updateFormData }) => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom>
          What is your name?
        </Typography>
        
        <Box mt={3}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value, lastName })}
            placeholder="Enter your first name"
            autoFocus
            margin="normal"
            error={firstName === ''}
            helperText={firstName === '' ? 'First name is required' : ''}
          />
          
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => updateFormData({ firstName, lastName: e.target.value })}
            placeholder="Enter your last name"
            margin="normal"
            error={lastName === ''}
            helperText={lastName === '' ? 'Last name is required' : ''}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default NameStep;