import VehicleType from '../models/VehicleType.js';
import Vehicle from '../models/Vehicle.js';

export const seedDatabase = async () => {
  try {
    // Create vehicle types
    const hatchback = await VehicleType.create({
      name: 'Hatchback',
      wheelCount: 4,
      description: 'Compact cars with a rear door that opens upward',
    });

    const sedan = await VehicleType.create({
      name: 'Sedan',
      wheelCount: 4,
      description: 'A passenger car with a three-box configuration',
    });

    const suv = await VehicleType.create({
      name: 'SUV',
      wheelCount: 4,
      description: 'Sport Utility Vehicle with high ground clearance',
    });

    const cruiser = await VehicleType.create({
      name: 'Cruiser',
      wheelCount: 2,
      description: 'Motorcycle designed for comfortable long-distance riding',
    });

    // Create vehicles
    // Hatchbacks
    await Vehicle.create({
      model: 'Swift',
      make: 'Suzuki',
      year: 2022,
      color: 'Red',
      licensePlate: 'HAT-1234',
      dailyRate: 35.00,
      vehicleTypeId: hatchback.id,
      imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    await Vehicle.create({
      model: 'i20',
      make: 'Hyundai',
      year: 2021,
      color: 'Blue',
      licensePlate: 'HAT-5678',
      dailyRate: 40.00,
      vehicleTypeId: hatchback.id,
      imageUrl: 'https://images.pexels.com/photos/5232961/pexels-photo-5232961.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    // Sedans
    await Vehicle.create({
      model: 'Civic',
      make: 'Honda',
      year: 2023,
      color: 'Silver',
      licensePlate: 'SED-1234',
      dailyRate: 50.00,
      vehicleTypeId: sedan.id,
      imageUrl: 'https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    await Vehicle.create({
      model: 'Camry',
      make: 'Toyota',
      year: 2022,
      color: 'Black',
      licensePlate: 'SED-5678',
      dailyRate: 55.00,
      vehicleTypeId: sedan.id,
      imageUrl: 'https://images.pexels.com/photos/9046789/pexels-photo-9046789.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    // SUVs
    await Vehicle.create({
      model: 'CR-V',
      make: 'Honda',
      year: 2023,
      color: 'White',
      licensePlate: 'SUV-1234',
      dailyRate: 65.00,
      vehicleTypeId: suv.id,
      imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    await Vehicle.create({
      model: 'Tucson',
      make: 'Hyundai',
      year: 2022,
      color: 'Green',
      licensePlate: 'SUV-5678',
      dailyRate: 60.00,
      vehicleTypeId: suv.id,
      imageUrl: 'https://images.pexels.com/photos/2526127/pexels-photo-2526127.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    // Cruisers
    await Vehicle.create({
      model: 'Royal Enfield',
      make: 'Classic 350',
      year: 2023,
      color: 'Black',
      licensePlate: 'CRU-1234',
      dailyRate: 30.00,
      vehicleTypeId: cruiser.id,
      imageUrl: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    await Vehicle.create({
      model: 'Harley Davidson',
      make: 'Street 750',
      year: 2022,
      color: 'Red',
      licensePlate: 'CRU-5678',
      dailyRate: 45.00,
      vehicleTypeId: cruiser.id,
      imageUrl: 'https://images.pexels.com/photos/163210/motorcycle-racer-racing-race-163210.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    console.log('Sample data created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};