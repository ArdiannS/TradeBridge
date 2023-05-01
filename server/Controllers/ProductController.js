const ProductModel = require("../Models/ProductModel");

class ProductController {
  static async insertJobs(req, res) {
    const {
      jobTitle,
      jobDescription,
      jobType,
      jobCategory,
      jobCity,
      jobPrice,
    } = req.body;

    try {
      const result = await ProductModel.insertJobs(
        jobTitle,
        jobDescription,
        jobType,
        jobCategory,
        jobCity,
        jobPrice
      );
      res.send("Job added successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding job");
    }
  }

  static async getJobs(req, res) {
    try {
      const result = await ProductModel.getAllJobs();
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving products");
    }
  }
  static async getJobById(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductModel.getJobsById(id);
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving job");
    }
  }

  static async deleteJob(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductModel.deleteJob(id, res);
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting job");
    }
  }
  static async updateJob(req, res) {
    const { id } = req.params;
    const {
      jobTitle,
      jobType,
      jobCategory,
      jobDescription,
      jobCity,
      jobPrice,
    } = req.body;
    try {
      const result = await ProductModel.updateJob(
        id,
        jobTitle,
        jobType,
        jobCategory,
        jobDescription,
        jobCity,
        jobPrice
      );
      res.status(200).json({ message: "Job Updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error Updating Job");
    }
  }
}

module.exports = ProductController;
