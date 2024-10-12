const mongoose = require ("mongoose")
const connectDB = async () => {
    try {
        console.log("as")
        await mongoose.connect("mongodb+srv://DevBackend-thomas:HTTQy.4_9GL$gc-@cluster0.977ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("conect dbs")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;