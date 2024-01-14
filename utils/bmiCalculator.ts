const calculateBMI = (weight: number, height: number) => {
  if (!isNaN(height) && !isNaN(weight)) {
    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    return bmi.toFixed(2);
  }
  return "----";
};

export default calculateBMI;
