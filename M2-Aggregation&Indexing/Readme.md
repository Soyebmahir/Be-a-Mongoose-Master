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
      _id: null,
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
