const ProductModel = require("../Models/ProductModel");

class ProductController {
  static async insertJobs(req, res) {
    const {
      jobTitle,
      jobDescription,
      jobType,
      jobCategory,
      jobCity,
    } = req.body;
    console.log(req.file);
    const buffer = req.file.buffer;
    const jobPhoto = buffer.toString("base64");
    console.log("ididid")
    const userid = req.session.userId;
    console.log(userid);

    try {
      const result = await ProductModel.insertJobs(
        jobTitle,
        jobDescription,
        jobType,
        jobCategory,
        jobCity,
        jobPhoto,
        userid
      );
    
      res.send("Job added successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding job");
    }
  }
  static async insertOffer(req, res) {
    const {
      jobPrice,
      userId,
      jobId,
      bidDescription
    } = req.body;

    try {
      const result = await ProductModel.insertJobOffer(
        userId,
        jobId,
        jobPrice,
        bidDescription


      );
      res.send("Offer added successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding Offer");
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
  static async getJobByCategory(req,res){
    try{
      const jobCategory = req.params.category;
      console.log("+++++++++++");
      console.log(jobCategory);
      const jobs = await ProductModel.getJobsByCategory(jobCategory);
      res.send(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving jobs by category');
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
  static async getJobOffers(req, res) {
    const id = req.params.id;
    console.log("job offer", id);
    
        try {
      const result = await ProductModel.getJobOffersByJobId(id);
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving Job Offers");
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
  static async getJobsByUserId(req, res) {
    console.log("ididid")
    const userId = req.session.userId;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const jobs = await ProductModel.getJobsByUserId(userId);
      res.json({ jobs });
      console.log(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async searchJobs(req, res) {
    const { title } = req.query;
    try {
      const jobs = await ProductModel.searchJobsByTitle(title);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
