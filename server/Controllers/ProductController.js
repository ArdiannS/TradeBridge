const ProductModel = require("../Models/ProductModel");

class ProductController {
    static async insertJobs(req, res) {
        const { jobType, jobCategory, jobDescription, jobPrice, jobCity } = req.body;
    
        try {
          const result = await ProductModel.insertJobs(jobDescription, jobType, jobCategory, jobCity, jobPrice);
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
}

module.exports = ProductController;