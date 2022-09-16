import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'juanreyval99@gmail.com', // generated ethereal user
      pass: 'kypymkmkwylojhef', // generated ethereal password
    },
  });

  transporter.verify().then(() =>{
    console.log('LISTO PARA ENVIAR MENSAJES ')
  })
export default  transporter