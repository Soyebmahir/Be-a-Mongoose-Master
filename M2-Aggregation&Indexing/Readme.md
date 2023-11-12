# <h2 style="color:yellow; text-align:center;">Mongodb Aggregation & Indexing </h2>

# What is Aggregation in MongoDB?

### Aggregation is a way of processing a large number of documents in a collection by means of passing them through different stages. The stages make up what is known as a pipeline. The stages in a pipeline can filter, sort, group, reshape and modify documents that pass through the pipeline.

# Aggregate

```js
db.test.aggregate([]); // return all data from test collection as like as 'find'
```

# $Match

### The $match stage allows us to choose just those documents from a collection that we want to work with. It does this by filtering out those that do not follow our requirements.

```js
db.test.aggregate([
  // stage:1 find document whose gender male and age less than 30
  { $match: { gender: "Male", age: { $lt: 30 } } },
  //   {$match:{age:{$lt:30}}} //rather than we can use this to upper match
]);
// we can use as much as $match operator but it's not suggested. more $match means more query time. we can find data with in single $match
```

# $Project

### return only those fields you need so as to avoid processing more data than is necessary.

### warning : try to use project at the last stage of Aggregate . if you use it before any other stage it will hamper the dat flow

```js
db.test.aggregate([
  // stage:1 find document whose gender male and age less than 30
  { $match: { gender: "Male", age: { $lt: 30 } } },
  // stage:2 project :  return only those fields you need so as to avoid processing more data than is necessary.
  { $project: { gender: 1, age: 1, name: 1 } },
]);
```

# $addFields

### It is possible that you need to make some changes to your output in the way of new fields.

### Important: $addFields wont modify the original data.

```js
db.test.aggregate([
  // stage:1 find document whose gender male
  { $match: { gender: "Male" } },
  // stage:2 add a field
  { $addFields: { job: true } }, // will add a new field name job but not in orginal document but in aggregate pipeline but if you use $out then $out must be the last one
  // project
  { $project: { gender: 1, job: 1 } },
]);
```

# $out

### This is an unusual type of stage because it allows you to carry the results of your aggregation over into a new collection, or into an existing one after dropping it, or even adding them to the existing documents (new in 4.1.2 version).

### The $out stage must be the last stage in the pipeline.

```js
db.test.aggregate([
  // stage:1 find document whose gender male
  { $match: { gender: "Male" } },
  // stage:2 add a field
  { $addFields: { job: true, course: "Level 2", eduTech: "Programming Hero" } },
  //stage 3 // create a collection and clone this collection data with $addFields items
  { $out: "Course-Students" },
]);
```

# $merge

### if I want to merge these new created field data - course,job, eduTech we should use this operator and indicate the name of collection with whom I want to merge

```js
db.test.aggregate([
  // stage:1 find document whose gender male
  { $match: { gender: "Male" } },
  // stage:2 add a field
  { $addFields: { job: true, course: "Level 2", eduTech: "Programming Hero" } },
  //stage 3  must be write name of collection with whom I want to merge these data
  { $merge: "test" }, //
]);
```

# $group

### With the $group stage, we can perform all the aggregation or summary queries that we need, such as finding counts, totals, averages or maximums.

```js
db.test.aggregate([
    // _id:"$gender" will create a document with the available gender.
    // count will count how many person with in every different gender
    //$push:'$$ROOT' will store all data field in fullDoc

   {$group:{_id:"$gender",count:{$sum:1}, fullDoc:{$push:"$$ROOT"}}}
//    {$group:{_id:"$gender",count:{$sum:1}, name:{$push:"$name"}}} //in every group there will just name
{$project: {
       "fullDoc.name":1,
       "fullDoc.email":1, // if you just write: name:1, email:1 it wont give you anything cz now we are in fullDoc
       "fullDoc.phone":1,
   }}
//    can define which field I want to return
    ]);
```

# More with $group and $project

```js
db.test.aggregate([
  {
    $group: {
      _id: null, // by null we declare a global id where everything is stored so that we can easily create report
      count: { $sum: 1 },
      fullDoc: { $push: "$$ROOT" }, //since fullDoc under one group so we can calculate with all salary field from all object of fullDoc
      totalSalary: { $sum: "$salary" },
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" },
      avgSalary: { $avg: "$salary" },
    },
  },
  {
    $project: {
      totalSalary: 1,
      maxSalary: 1,
      minSalary: 1,
      averageSalary: "$avgSalary", //with project we can rename field
      differBetweenMaxMin: { $subtract: ["$maxSalary", "$minSalary"] }, // also calculate in project , here we calculate the differ between min max
    },
  },
]);
```

# $unwind

### You cannot work directly on the elements of an array within a document with stages such as $group. The $unwind stage enables us to work with the values of the fields within an array.

### Where there is an array field within the input documents, you will sometimes need to output the document several times, once for every element of that array.

```js
db.test.aggregate([
  {
    $unwind: "$interests", // breaks the interests array
  },
  {
    $group: { _id: "$age", commonInterests: { $push: "$interests" } }, // create group with similar age and make common interest in every age
  },
]);
```

# $bucket

### Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries and outputs a document per each bucket. Each output document contains an \_id field whose value specifies the inclusive lower bound of the bucket. The

### output option specifies the fields included in each output document.

```js
db.test.aggregate([
  // stage 01

  {
    $bucket: {
      groupBy: "$age", //which field will be group id
      boundaries: [20, 40, 60], // boundaries are the actual group Id
      default: "More than 80", // this will be the group id with remaining ages
      output: {
        //this will show the result
        count: { $sum: 1 }, //
        karakaraAche: { $push: "$$ROOT" },
      },
    },
  },
  {
    $sort: { count: -1 }, // we can sort with $sort
  },
  {
    $limit: 1,
  },
  {
    $project: { "karakaraAche._id": 1, "karakaraAche.name": 1, count: 1 },
  },
]);
```

# $facet

### The $facet stage in MongoDB's aggregation framework is used to process multiple aggregation pipelines within a single stage on the same set of input documents. It allows you to compute multiple aggregations on the same set of documents, which can be useful for various scenarios.

```js
db.sales.aggregate([
  {
    $facet: {
      totalSales: [
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ],
      averageQuantity: [
        { $group: { _id: null, avgQuantity: { $avg: "$quantity" } } },
      ],
      count: [{ $count: "totalDocuments" }],
    },
  },
]);
```

### another One

```js
db.test.aggregate([
  {
    $facet: {
      //pipeLine 1
      friendsCOunt: [
        //stage 1
        { $unwind: "$friends" },
        { $group: { _id: "$friends", count: { $sum: 1 } } },
      ],
      //pipeline 2
      educationCount: [
        //stage 1
        { $unwind: "$education" },
        //stage 2
        { $group: { _id: "$education", count: { $sum: 1 } } },
      ],
    },
  },
]);
```

# $lookup

### The $lookup stage in MongoDB's aggregation framework is used to perform a left outer join between documents from the input collection and documents from another collection. This is particularly useful when you want to combine data from multiple collections based on a common field.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "test", // from which collection
      localField: "userId", //with which local field
      foreignField: "_id", //
      as: "userDetails",
    },
  },
]);
```

# Indexing

### Indexing in MongoDB is a way to optimize the performance of queries by creating a data structure that allows the database to efficiently retrieve and filter documents. An index is a special data structure that stores a small portion of the collection’s data set in an easy-to-traverse form.

# Collscan (Collection Scan):

### A collscan occurs when a query needs to scan the entire collection to find the matching documents. This usually happens when there is no suitable index for the query or when the query planner determines that using an index is not optimal.

### A collscan is generally less efficient, especially for large collections, as it involves scanning every document in the collection to find the desired results.

# Ixscan (Index Scan):

```js
//create index for specific field
db.massiveData.createIndex({ email: 1 });
// now if I search with gmail field it wont take as collscan
```

### An ixscan occurs when MongoDB uses an index to fulfill a query. Instead of scanning the entire collection, MongoDB uses the index to quickly locate the relevant documents.

### An ixscan is generally more efficient than a collscan, particularly when dealing with large datasets, as it allows MongoDB to avoid scanning unnecessary documents.

```js
// with this we can check the time
db.massiveData.find({email:"hazelmcmillan@micronaut.com"}).explain(''executionStats)

// remove from index with dropIndex
db.massiveData.dropIndex({email:1})
```

# Compound Index

```js
db.massiveData.createIndex({ gender: -1, age: 1 });
```

# text index

```js
db.massiveData.createIndex({ about: "text" }); //create search index with text

db.massiveData.find({ $text: { $search: "dolor" } }); // find with search index field
```
