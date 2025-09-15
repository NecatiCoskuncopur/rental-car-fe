interface FormItem {
  id: 'vehicleType' | 'fuelType' | 'transmissionType';
  label: string;
  options: string[];
}

const vehicleFilterFormData: FormItem[] = [
  {
    id: 'vehicleType',
    label: 'Vehicle Type',
    options: ['sedan', 'suv', 'van', 'station vagon', 'mpv', 'hatchback'],
  },
  {
    id: 'fuelType',
    label: 'Fuel Type',
    options: ['gasoline', 'diesel', 'electric', 'hybrid'],
  },
  {
    id: 'transmissionType',
    label: 'Transmission Type',
    options: ['manual', 'automatic'],
  },
];

export default vehicleFilterFormData;
