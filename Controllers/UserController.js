const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

            const user = await User.create(req.body);
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
    }

};

module.exports = UserController;