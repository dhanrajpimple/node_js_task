const generateCSV = (data, filename) => {
  const headers = ['ID,Name,Date,Capacity,Available Seats'];
  const rows = data.map(event => 
    ${event._id},${event.name},${event.date.toISOString()},${event.capacity},${event.availableSeats}
  );
  return { content: [headers, ...rows].join('\n'), filename };
};

module.exports = { generateCSV };