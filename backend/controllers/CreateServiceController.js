// controllers/CreateServiceController.js
import Service from "../models/CreateService.js";

// Create a service
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
      price: Number(price),
      image: imagePath,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully ✅", service: newService });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ message: "Failed to create service ❌", error: error.message });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error.message);
    res.status(500).json({ message: "Failed to fetch services ❌", error: error.message });
  }
};
