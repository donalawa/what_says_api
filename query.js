let query;

//copy req.query
const reqQuery = { ...req.query };

//Fields to exclude when filtering
const removeFields = ['select','sort','page','limit'];

//Loop over removeFields and delete them from request query
removeFields.forEach(param => delete reqQuery[param]);

//Create Query String
let queryStr = JSON.stringify(reqQuery);

//Create Operators ($gt,$gte,etc)
queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

//Finding Resource

query = CoursePage.find(JSON.parse(queryStr));
//Select Specific Fields
if(req.query.select) {
    const fields = req.query.select.split(',').join(" ");;
    query = query.select(fields);

}

//Sort
if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
}else {
    query = query.sort('-createdAt');
}

//Pagination
const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10) || 10;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await CoursePage.countDocuments();

query = query.skip(startIndex).limit(limit);

// Executing our query
let courses = await query;
//pagination result
const pagination = {};

if(endIndex < total) {
     pagination.next = {
         page: page + 1,
         limit
     }
}

if(startIndex > 0) {
    pagination.prev = {
        page: page - 1,
        limit
    }
}

res.status(200).json({success: true,count: courses.length, pagination: pagination, message: 'All courses Found', data: courses})