// controllers/CreateServiceController.js
import Service from "../models/CreateService.js";

// ================= CREATE SERVICE =================
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
    res
      .status(201)
      .json({ message: "Service created successfully ✅", service: newService });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create service ❌", error: error.message });
  }
};

// ================= GET ALL SERVICES =================
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch services ❌", error: error.message });
  }
};

// ================= UPDATE SERVICE =================
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, priceType, price } = req.body;

    // Find existing service
    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found ❌" });
    }

    // Update image if a new one is uploaded
    let imagePath = existingService.image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Update fields
    existingService.title = title || existingService.title;
    existingService.category = category || existingService.category;
    existingService.priceType = priceType || existingService.priceType;
    existingService.price = price ? Number(price) : existingService.price;
    existingService.image = imagePath;

    await existingService.save();

    res.status(200).json({
      message: "Service updated successfully ✅",
      service: existingService,
    });
  } catch (error) {
    console.error("Error updating service:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update service ❌", error: error.message });
  }
};

// ================= DELETE SERVICE =================
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found ❌" });
    }

    res
      .status(200)
      .json({ message: "Service deleted successfully ✅", service: deletedService });
  } catch (error) {
    console.error("Error deleting service:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete service ❌", error: error.message });
  }
};
