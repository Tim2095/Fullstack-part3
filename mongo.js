// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]
// const url = `mongodb+srv://timur:${password}@cluster0.waawzgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)

// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String
// })

// const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name,
//   number
// })

// person.save().then(response => {
//   // console.log(`Added ${person} to the phone book`)
//   // console.log(response)
//   Person.find({}).then(people => {
//     console.log('Phonebook: ')
//     people.forEach(person => {
//       console.log(person.name, person.number)
//     })
//     mongoose.connection.close()
//   })

// })