function Event({
  timeStart,
  timeEnd,
  selectedColor,
  eventName,
  dayOfWeek,
  repeatFrequency,
  eventDescription,
}) {
  if (!timeStart || !timeEnd) {
    console.log("time was not set:" + timeStart + " , " + timeEnd )// If timeStart or timeEnd is undefined, return null
    return null;
  }

  // Parse the time data into minutes
  console.log("You are looking for this output:" + eventName + " " +  timeStart + " " +  timeEnd);
  const fromHours = parseInt(timeStart.split(':')[0]);
  const fromMinutes = parseInt(timeStart.split(':')[1]);
  const toHours = parseInt(timeEnd.split(':')[0]);
  const toMinutes = parseInt(timeEnd.split(':')[1]);
  
  // Calculate the difference between timeEnd and timeStart in minutes
  const minutesDiff = (toHours - fromHours) * 60 + (toMinutes - fromMinutes);
  
  // Calculate the gridRow based on timeStart
  const gridRow = fromHours * 60 / 5 + fromMinutes / 5 + 1;
  
  return (
    <div style={{ gridRow: `${gridRow} / span ${minutesDiff / 5}` }} className="border bg-red-600 rounded-md">
      <div>Name: {eventName}</div>
      <div>Time from: {timeStart}</div>
      <div>Time to: {timeEnd}</div>
    </div>
  );
}

export default Event;
