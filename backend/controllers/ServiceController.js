import Service from "../models/Service.js";

// Create new service
export const createService = async (req, res) => {
  try {
    const { title, category, priceType, price } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newService = new Service({
      title,
      category,
      priceType,
      price,
      image: imagePath,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Failed to create service" });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};
