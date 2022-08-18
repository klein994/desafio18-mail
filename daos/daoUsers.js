import containerMongoose from "../containers/containerMongoose.js";

class daoUsers extends containerMongoose{
    constructor(collection) {
        super(collection)
    }
    async findByUsername(email) {
        const userFinded = await this.collection.findOne({ email });
        return userFinded;
    }
    async saveIfDontExists(user) {
        const userFinded = await this.findByUsername(user.email);
        let added;
        if(!userFinded){
            added= await this.save(user);
        }
        return added;
    }
}

export default daoUsers;