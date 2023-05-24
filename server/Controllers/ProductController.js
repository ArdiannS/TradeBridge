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
    const buffer = req.file.buffer;
    const jobPhoto = buffer.toString("base64");

    try {
      const result = await ProductModel.insertJobs(
        jobTitle,
        jobDescription,
        jobType,
        jobCategory,
        jobCity,
        jobPrice,
        jobPhoto
      );
      res.send("Job added successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding job");
    }
  }
  static async getNumberOfAllJobs(req, res) {
    try {
      const totalJobs = await ProductModel.getNumberOfAllJobs();
      if (totalJobs) {
        res.send(totalJobs.toString());
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving jobs");
    }
  }

  static async getSimilarJobs(req, res) {
    try {
      const jobCategory = req.body.jobCategory;
      console.log(jobCategory);
      const jobs = await ProductModel.getSimilarJobs(jobCategory);
      res.send(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving jobs by category");
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
  static async getJobPhotoById(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductModel.getJobPhotoById(id);
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving jobPhoto");
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
