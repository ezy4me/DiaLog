const calculateBMI = (
  weight: number | undefined,
  height: number | undefined
) => {
  if (weight && height)
    if (!isNaN(height) && !isNaN(weight)) {
      const heightInMeters = height / 100;

      const bmi = weight / (heightInMeters * heightInMeters);

      return bmi.toFixed(2);
    }
  return "____";
};

export default calculateBMI;
