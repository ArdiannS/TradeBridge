const database = require("../Configuration/DataBaseConnection")
class ProductModel{
    static async insertJobs(jobTitle, jobType, jobCategory, jobDescription, jobPrice, jobCity){
    return new Promise(resolve => {
        database.query("Insert into Jobs values (?,?,?,?,?,?)",[jobTitle, jobType, jobCategory, jobDescription, jobPrice, jobCity],(error,result)=>{
            if(!error)
            resolve(result);
        })
    })
}
}
module.exports = ProductModel;