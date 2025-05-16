import mongoose from "mongoose"

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN_URL)
        console.log('database connected.')
    }
    catch(err) {
        console.log(err)
    }
}