// controllers/CreateServiceController.js
import Service from "../models/CreateService.js";

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
      price: Number(price), // ensure it's a number
      image: imagePath,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully ✅", service: newService });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ message: "Failed to create service ❌", error: error.message });
  }
};
