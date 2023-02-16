const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://test:${password}@cluster0.kh07e9z.mongodb.net/phoneApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)


if (process.argv.length === 3) {
  Phone.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(res => {
      console.log(res.name, res.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const phone = new Phone({
    name,
    number,
  })

  phone.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('argument error! your argument length should be 3 or 5')
  mongoose.connection.close()
  process.exit(1)
}
