const ProductModel = require("../Models/ProductModel");

class ProductController {
  static async insertJobs(req, res) {
    const { jobTitle, jobDescription, jobType, jobCategory, jobCity } =
      req.body;
    const buffer = req.file.buffer;
    const jobPhoto = buffer.toString("base64");
    console.log('-------------------- ', req.session)
    const userid = req.session.userId;

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

      res.redirect("/jobsearch");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding job");
    }
  }
  static async insertOffer(req, res) {
    const { jobPrice, userId, jobId, bidDescription } = req.body;

    try {
      const result = await ProductModel.insertJobOffer(
        userId,
        jobId,
        jobPrice,
        bidDescription
      );
      res.redirect("/jobsearch"); // Redirect to the "jobsearch" page
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
  static async getJobByCategory(req, res) {
    try {
      const jobCategory = req.params.category;
      const jobs = await ProductModel.getJobsByCategory(jobCategory);
      res.send(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving jobs by category");
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


  static async getSimilarJobs(req, res) {
    try {
      const jobCategory = req.body.jobCategory;
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

  static async getFavoriteJobs(req, res) {
    try {
      const favoriteJobs = await ProductModel.getFavoriteJobs();
      if (favoriteJobs) {
        res.send(favoriteJobs);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving favorite jobs");
    }
  }

  static async getAllJobOffers(req, res) {
    try {
      const result = await ProductModel.getAllJobOffers();
      if (result) {
        res.send(result);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving Job Offers");
    }
  }
  static async getJobOffers(req, res) {
    const id = req.params.id;
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
  static async deleteJobOfferById(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductModel.deleteJobOffer(id);
      res.status(200).json({ message: "Job Offer deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting job");
    }
  }
  static async updateJob(req, res) {
    const { id } = req.params;
    const { jobTitle, jobType, jobCategory, jobDescription, jobCity } =
      req.body;

    try {
      const result = await ProductModel.updateJob(
        id,
        jobTitle,
        jobType,
        jobCategory,
        jobDescription,
        jobCity
      );
      res.redirect("/alljobs");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error Updating Job");
    }
  }
  static async updateJobOffer(req, res) {
    const { id } = req.params;
    const { bidAmount, bidDescription } = req.body;


    try {
      const result = await ProductModel.updateJobOffers(
        bidAmount,
        bidDescription,
        id
      );
      if(result){
        res.redirect("/jobsearch");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error Updating Job");
    }
  }
  static async getJobsByUserId(req, res) {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const jobs = await ProductModel.getJobsByUserId(userId);
      res.json({ jobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async deleteMyJob(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductModel.deleteMyJob(id);
      res.status(200).json({ message: "My Job deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting job");
    }
  }

  static async updateFavoriteJobs(req, res) {
    const { jobId, favoriteJobs } = req.body.body;
    console.log(' body' ,req.body.body)
    try {
      const result = await ProductModel.updateFavoriteJobs(jobId, favoriteJobs);
      res.status(200).json({ message: "My Job deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating job");
    }
  }

  static async updateMyJob(req, res) {
    const jobId = req.params.id;
    const { jobTitle, jobType, jobCategory, jobDescription, favoriteJobs } = req.body;
    console.log('this is edi tjob', jobTitle, jobType, jobId, favoriteJobs);
    console.log('this req.body', req.body);

    try {
      const result = await ProductModel.updateMyJob(
        jobTitle,
        jobType,
        jobCategory,
        jobDescription,
        jobId
      );
      res.redirect("/myjobs/:id");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating job");
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
