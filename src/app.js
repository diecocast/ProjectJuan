import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import transporter from "./Manager/container.js"
const app = express()
const PORT = 8080

const server = app.listen(PORT,()=>{console.log(`Èscuchando en ${PORT}`)})


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname + '/views')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.text())



app.get('/',(req,res)=>{
    res.render('home')
})
app.post('/form',async(req,res)=>{
    let data = req.body
    await transporter.sendMail({
        from: `${data.name}`, // sender address
        to: "juansebastianreyes@plataformapascal.com", // list of receivers
        subject: "New Message from web", // Subject line
        text: ``, // plain text body
        html: "<b>De: </b>"+data.name+"<br><b>Email: </b>"+data.email+"<br><br>"+data.message, // html body
      });

      await transporter.sendMail({
        from: `Nombre Empresa`, // sender address
        to: `${data.email}`, // list of receivers
        subject: "Nombre Empresa || Contact Form", // Subject line
        text: ``, // plain text body
        html: "Su peticion a sido recibida con exito, lo estaremos contactando pronto", // html body
      });

    console.log("Enviado con exito")
})
