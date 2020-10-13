const changeTimeFormat = (date) => {
  const time = date;
  let hours = time.getHours(); // gives the value in 24 hours format
  const AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  let min = time.getMinutes();
  const minutes = min <= 9 ? '0' + min : min;
  const finalTime = hours + ':' + minutes + ' ' + AmOrPm;
  return finalTime;
};

export default changeTimeFormat;
