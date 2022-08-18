import container from "./../containers/containerMongoose.js";

class daoProducts extends container{
    constructor(collection) {
        super(collection)
    }
}

export default daoProducts;