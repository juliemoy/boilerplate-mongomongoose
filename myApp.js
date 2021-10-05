var express=require('express');
var app=express();
var port = 3000;
require('dotenv').config();
var mongoose = require('mongoose');
//var bodyParser=require('body-parser');

//app.use(bodyParser.urlencoded({extended: false}));

console.log(process.env.MONGO_URI);

//mongoose.connect(process.env.MONGO_URI);

app.get('/', (req,res) => {
  res.send('Hello World ');
})

let Person;
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var document = new Person({
    name: 'Julie', 
    age: 32, 
    favoriteFoods: ['oatmeal', 'coffee', 'breakfast']});
  document.save((err,data) => (err ? done(err) : done(null, data)));
};

var arrayOfPeople = [
  {
    name: 'Julie',
    age: 32,
    favoriteFoods: ['oatmeal', 'lentils', 'rice']
  },
  {
    name: 'Michelle',
    age: 36,
    favoriteFoods: ['coffee', 'beans', 'steak']
  },
  {
    name: 'Marsha',
    age: 69,
    favoriteFoods: ['yogurt', 'hot dogs', 'pizza']
  },
  {
    name: 'John',
    age: 71,
    favoriteFoods: ['coconut', 'pepperoni']
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data) => (err ? done(err) : done(null, data)));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err,data) => (err ? done(err) : done(null, data)));
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => (err ? done(err) : done(null, data)));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => (err ? done(err) : done(null, data)));
  console.log(data);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => (err ? done(err) : done(null, updatedPerson)));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => (err ? done(err) : done(null, updatedPerson)));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, dataRemoved) => (err? done(err) : done(null, dataRemoved)));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, outcomeJSON) => (err ? done(err) : done(null, outcomeJSON)));
};

const queryChain = (done) => {
  const foodToSearch = "oatmeal";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec((err, results) => (err ? done(err) : done(null, results)));
  console.log(results);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;


app.listen(port,()=>{
  console.log(`App listening on port: ${port}`);
});

console.log(queryChain);