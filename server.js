import express from 'express'
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    

    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Senha incorreta" })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        )

        

        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, profileUrl:user.profileUrl } })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro no servidor" })
    }
})

app.post("/users", async (req, res) => {

    const { name, email, age, password } = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(salt)
        console.log(hashedPassword)

        await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                password: hashedPassword,
                profileUrl:name.toLowerCase()
            }
        })
        res.status(201).json(req.body)
    }
    catch{
        res.status(500).send()
    }
})


app.put("/users/:id", async (req, res) => {

    console.log(req)


    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)

    res.status(201).json(req.body)
})

app.get("/users", async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age,
                password: req.query.password
            }
        })
    } else {
        users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})

app.delete("/users/:id", async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuario deletado" })
})

app.put("/profile/:id", async (req, res) => {

    const { bio, music, background } = req.body

    try {

        const updatedUser = await prisma.user.update({
            where: { id: req.params.id},
            data: { bio, music, background }
        })
        
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: " Error Updating Profile"})
    }

})

app.get("/u/:profileUrl", async (req, res) => {

    try {
        const user = await prisma.user.findUnique({
            where: { profileUrl: req.params.profileUrl}
        })
        
        if(!user) return res.status(404).json({message: "Profile Not Found"})    
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message: "Error In Server"})
    }

})


app.listen(3000)