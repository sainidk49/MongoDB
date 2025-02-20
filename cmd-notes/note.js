// #1 =>  show dbs  :- show all database

// #2 => show collectiosn  :- show all collectios

// #3 => use your database or create new DB

// use mydatabase

// #3 => db.createCollection("name")

// #4 => 
db.mycollection.insertOne({ "name": "Deepak", "age": 27, "gmail": "dpksaini49@gmail.com" })


// #5 => 
db.mycollection.insertMany([{ "name": "Deepak", "age": 27, "gmail": "dpksaini49@gmail.com" }, { "name": "ajay", "age": 23, "gmail": "ajbist@gmail.com" }])


// #6 => 
db.mycollection.findOne({ "name": "Deepak" })


// #7 => provide first data 
db.mycollection.find({ "name": "Deepak" })

// set limit
db.userJson.find().limit(2)


// #9 => provide only these data
db.mycollection.fine({ "name": "Deepak" }, { "name": 1, "age": 1 })


// #10 => provide user all data except age
db.mycollection.fine({ "name": "Deepak" }, { "age": 0 })


// #11 => =============== update user Data ==================
db.mycollection.updateOne(
    { "email": "dpksaini49@gmail.com" },
    {
        $set:
        {
            "age": 26
        }
    }
)


// #12 => update or insert if user not found
db.mycollection.updateOne(
    { "email": "dpksaini49@gmail.com" },
    {
        $set:
        {
            "name": "deepak",
            "age": 26,
            "Gender": "male"
        }
    },
    { upsert: true } //// if user not found
)


// #13 => delete user data
db.mycollection.deleteOne(
    { "email": "dpksaini49@gmail.com" }
)


// #14 => delete user data
db.mycollection.deleteMany(
    { "email": "dpksaini49@gmail.com" }
)


// #15 => truncat collection 
db.mycollection.remove({})


//================= aggregation pipeline =====================

///// count pipeline => count data
db.mycollection.aggregate([
    {
        $count: "email"
    }
]) //// return=> return count of all email


///// count pipeline => count data
db.userJson.aggregate([
    {
        $match: { email: { $exists: true } }
    }
]) //// return=> data where email exist


///// match pipeline => filter data to fetch as common data
db.mycollection.aggregate([
    {
        $match: { "gender": "female", "age": 18 } // also use=> age: { $lt: 18 }, { $gt: 18 }, { $gt: 18, $lt: 60 }
    }
]) //// return=>  all filter data



///// match pipeline => filter data to fetch as common data
db.mycollection.aggregate([
    {
        $match: { "gender": "female" }
    },
    {
        $count: "femaleCount"
    }
]) //// return=> { femaleCount: 30 }



///// limit pipeline get first 10 data
db.mycollection.aggregate([
    {
        $match: { "gender": "male" }
    },
    {
        $limit: 10
    }
]) ///// return => count of 10 email data in Array


///// limit pipeline get first 10 data in desending order
db.mycollection.aggregate([
    {
        $match: { "gender": "male" }
    },
    {
        $sort: { _id: -1 }
    },
    {
        $limit: 10
    }
]) ///// return => count of 10 email data in Array



// =======================  group data ======================
db.mycollection.aggregate([
    {
        $group: {
            _id: "$gender"
        },
    }
]) ////// return => {_id: 'female'}{_id: 'male'}


// ============  group data and count to make extra field ===============
db.mycollection.aggregate([
    {
        $group: {
            _id: "$gender",
            genderCount: {
                $sum: 1
            }
        },
    }
]) ////// return => {_id: 'female', genderCount: 30}{_id: 'male', genderCount: 26}


// ============  group data and count to make extra field and sort ===============
db.mycollection.aggregate([
    {
        $group: {
            _id: "$gender",
            genderCount: {
                $sum: 1
            }
        }
    },
    {
        $sort: { _id: -1 }
    }
]) //////////return => {_id: 'male', genderCount: 26}{_id: 'female', genderCount: 30}


// ============  Add Field ===============
db.mycollection.aggregate([
    {
        $addFields: {
            address: "xyz"
        }
    }
]) /////=> add addres in all document


// ============  project to get only specific field ===============
db.mycollection.aggregate([
    {
        $match: {
            'gender': 'male'
        },
    }, 
    {
        $project: { age: 1}
    }

]) /////=> return only age field of male gender


// ============  lookup to join two collection ===============
db.mycollection.aggregate([
    {
        $lookup: {
            from: "mycollection2", //// collection name
            localField: "id",   //// local user user id
            foreignField: "id", // match user id from order collection 
            as: "mycollection2" //// add custume name like order detail
        }
    }

]) /////=> in this match userId in other collection => localField and foreignField