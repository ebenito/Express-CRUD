const User = require('../models/User');
const bcrypt = require('bcryptjs');
const transporter = require('../config/nodemailer');

const UserController = {
    getAll(req,res) {
        User.find()
        .then(users => res.send(users))
        .catch(error => {
            console.error(error);
            res.status(500).send(error);
        });
    },
    //Método asyncrono de encriptado, con Async/Await:
    async registerAsync(req,res) {
        try {
            const hash = await bcrypt.hash(req.body.password,9);          
            console.log(req.body.password, hash);
            req.body.password = hash;

            req.body.confirmed = false;
            const user = await User.create(req.body);
            
            await transporter.sendMail({
                from: "Heroku - Mis pruebas",
                to: user.email,
                subject:"Bienvenido a nuestra newsletter",
                html: `
                <html>
                <body>
                    <h3>Bienvenido a nuestro sitio web de pruebas en Heroku</h3>
                    <img src="https://rciproducciones.files.wordpress.com/2017/01/a540b0498bad80c0269f21900050c899.png"
                        alt="Bienvenido" />
                    <hr />
                    <div>
                        Gracias ${user.name} por registrarte en nuestro sitio web.
                        <br />
                        Haz click
                        <a href="https://mispruebas-api.herokuapp.com/users/confirm/${user.id}">aquí</a>
                        para confirmar tu registro.
                    </div>
                </body>
                </html>
                `
            },(console.log('Correo enviado')));
            res.status(201).send(user);            
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    registerSync(req,res) {
        //Encriptado sincrono de la constraseña (puede dar problemas, mejor Async/Await)
        const hash = bcrypt.hashSync(req.body.password,9);
        console.log(req.body.password, hash)
        req.body.password = hash;

        User.create(req.body)
        .then(user=>res.status(201).send(user))
        .catch(error=> {
            console.error(error);
            res.status(500).send(error);
        });

        //Método asincrono de encriptado, con promesas:
        // bcrypt.hash(req.body.password,9).then(hash => {
        //     console.log(req.body.password, hash);
        //     req.body.password = hash;

        //     User.create(req.body)
        //     .then(user=>res.status(201).send(user))
        //     .catch(error=> {
        //         console.error(error);
        //         res.status(500).send(error);
        //     });
        // })      
    },
    async updateAsyc(req,res) {
        try {
            if (req.body.password) {
                const hash = await bcrypt.hash(req.body.password,9);  
                req.body.password = hash; 
            }
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true}) //con new:true indicamos que nos devuelva el registro actualizado, sino nos devolvera el registro original
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    delete(req,res) {
        User.findByIdAndDelete(req.params.id)
        .then(user => res.send(user))
        .catch(error => {
            console.error(error);
            res.status(500).send(error);
        });
    },
    async deleteAsync(req,res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id, req.body) 
            if (!user) {
                return res.status(204).send(); //No content 
            }
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'Hubo un problema tratando de eliminar el usuario con id: ' + req.params.id, error})
        }        
    },
    confirm(req, res) {
        User.findByIdAndUpdate(req.params.id, { confirmed : true }, {new:true})
        .then(user => res.send(user))
        .catch(error => {
            console.error(error);
            res.status(500).send({
                message: 'Hubo un problema al confirmar el usuario',
                error
            });
        });
    }

};

module.exports = UserController;