import mongoose from "mongoose";

const url = "mongodb+srv://phucquy:fwU89cavVmHOklBr@clothing-stores-db.t9pcelr.mongodb.net/todoList?retryWrites=true&w=majority";

const database = async ()=>{
    return await mongoose.connect(url)
}

export default database