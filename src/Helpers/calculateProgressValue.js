const calculateProgressValue = (daysLeft) => {
  const daysCompleted = 21 - daysLeft;
  const progressValue = daysCompleted * 0.047619048;
  return progressValue;
};

export default calculateProgressValue;
