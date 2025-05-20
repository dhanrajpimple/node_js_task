const Event = require('../model/Event');

const createEvent = async (req, res) => {
  try {
    const { name, date, capacity } = req.body;
    
    if (!name || !date || !capacity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = new Event({
      name,
      date,
      capacity,
      availableSeats: capacity,
      createdBy: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const { start, end, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (start && end) {
      query.date = { $gte: new Date(start), $lte: new Date(end) };
    }

    const events = await Event.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ date: 1 });

    const total = await Event.countDocuments(query);
    
    res.json({
      events,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, capacity } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.name = name || event.name;
    event.date = date || event.date;
    if (capacity) {
      event.capacity = capacity;
      event.availableSeats = capacity - (event.capacity - event.availableSeats);
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };