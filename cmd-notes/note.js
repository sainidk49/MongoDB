// #1 =>  show dbs  :- show all database

// #2 => show collectiosn  :- show all collectios

// #3 => use your database or create new DB
// use mydatabase

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

///// match pipeline
db.mycollection.aggregate([
    {
        $match: { "email": "dpksaini49@gmail.com" }
    }
])


///// count pipeline
db.mycollection.aggregate([
    {
        $count: "email" //// return count of all male data
    }
])


///// limit pipeline
db.mycollection.aggregate([
    {
        $match: { "gender": "male" }
    },
    {
        $limit: 10
    }
])


///////// group pipe line
db.mycollection.aggregate([
    {
        $group: {
            _id: "$gender", /// use doller sign
            count: {
                $sum: 1
            }
        },
    }
]) ////////// retun total count group of male and famale


///////// sort pipe line
db.mycollection.aggregate([
    {
        $group: {
            _id: "$gender", /// use doller sign
            genderCount: {
                $sum: 1
            }
        },
        sort:{
            genderCount: -1
        }
    }
]) ////////// descending order