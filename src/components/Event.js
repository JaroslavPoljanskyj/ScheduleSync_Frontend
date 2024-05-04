function Event({ name, timeFrom, timeTo }) {
    // Rozparsování časových údajů do minut
    console.log("tenhle vypis hledas:" + name + " " +  timeFrom + " " +  timeTo);
    const fromHours = parseInt(timeFrom.split(':')[0]);
    const fromMinutes = parseInt(timeFrom.split(':')[1]);
    const toHours = parseInt(timeTo.split(':')[0]);
    const toMinutes = parseInt(timeTo.split(':')[1]);
  
    // Výpočet rozdílu mezi timeTo a timeFrom v minutách
    const minutesDiff = (toHours - fromHours) * 60 + (toMinutes - fromMinutes);
  
    // Výpočet gridRow na základě timeFrom
    const gridRow = fromHours * 60 / 5 + fromMinutes / 5 + 1;
  
    return (
      <div style={{ gridRow: `${gridRow} / span ${minutesDiff / 5}` }} className="border bg-red-600 rounded-md">
        <div>Name: {name}</div>
        <div>Time from: {timeFrom}</div>
        <div>Time to: {timeTo}</div>
      </div>
    );
  }

  export default Event;