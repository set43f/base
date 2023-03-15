const express = require('express')
const mongoose = require('mongoose')
const path = require('node:path');
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
mongoose.set("strictQuery", false);

app.use(express.static('public'))
app.use(todoRoutes)



async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://set:admin@cluster0.4y2pui5.mongodb.net/todo',
            {
                useNewUrlParser: true            
            }
        )
        app.listen((PORT), () => {
            console.log('start server ....')
        })
    } catch (e) {
        return console.log(e)
    }
}

start()