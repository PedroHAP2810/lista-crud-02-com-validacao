const express = require("express");
const router = express.Router()

const listaPessoas = [
    {
        "id": 1,
        "nome": "Pedro Alves" ,
        "idade": 20,
        "email":"pedro.pessoa@iesb.edu.br",
        "telefone":61983131073
    },
    {   "id": 2,
        "nome": "Aline Alves" ,
        "idade":23,
        "email": "aline2000_sg@hotmail.com",
        "telefone": 61994136271
    }
]

router.get('/pessoas', (req, res) =>{

    res.json(listaPessoas)
})

router.get("/pessoas/:id", (req, res) => {
    const id = req.params.id
    const cadastro = listaPessoas.find (cadastro => cadastro.id == id);
    if (cadastro) {
        return res.json(cadastro)
    }
    return res.status(404).json({ mensagem: "Cadastro não Encontrado" })
})


//Adicionar pessoa

router.post("/pessoas/", (req, res) => {
    const dadosPessoas = req.body

    if (!dadosPessoas.nome || !dadosPessoas.idade || !dadosPessoas.email || !dadosPessoas.telefone) {
        return res.status(400).json({ mensagem: "Nome, Idade, E-mail, Telefone tem que ser informados" })
    }


    const novaPessoa = {
        id: listaPessoas.length + 1,
        nome: dadosPessoas.nome,
        idade: dadosPessoas.idade,
        email: dadosPessoas.email,
        telefone: dadosPessoas.telefone
    }
        listaPessoas.push(novaPessoa)
            return res.status(201).json({
        mensagem: "Cadastro atualizado com Sucesso",
        novaPessoas})

}) 

router.put("/pessoas/:id", (req , res) => {
    const id = req.params.id
    const atualizarPessoa = req.body

    if (!atualizarPessoas.nome || !atualizarPessoas.idade || !atualizarPessoas.email || !atualizarPessoas.telefone) {
        return res.status(400).json({ mensagem: "Nome, Idade, E-mail, Telefone tem que ser informados" })
    }

    const index =  listaPessoas.findIndex(pessoa => pessoa.id == id);

    if (index == -1) {
        return res.status(404).json({ mensagem: "Cadastro não Encontrado" })
    }

    const novaPessoa = {
        id:Number(id),
        nome: atualizarPessoa.nome,
        idade: atualizarPessoa.idade,
        email: atualizarPessoa.email,
        telefone: atualizarPessoa.telefone
    }

    listaPessoas[index] = novaPessoa

    return res.status(201).json({
        mensagem: "Cadastro Atualizado com Sucesso!",
        novaPessoas
    })
})

router.delete("/pessoas/:id", (req, res) => {
    const id = req.params.id
    const index = listaPessoas.findIndex(pessoa => pessoa.id == id);

    if (index == -1) {
        return res.status(404).json({ mensagem: "Cadastro não Encontrado" })
    }

    listaPessoas.splice(index, 1) //o número é a quantidade que você quer excluir
    return res.status(201).json({
        mensagem: " Cadastro Excluido com Sucesso!"
    })
})
module.exports = router