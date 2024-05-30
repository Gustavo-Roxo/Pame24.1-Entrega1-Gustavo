const { none } = require("list")
const prompt = require("prompt-sync")({sigint:true})

//gera os id's de novos clientes, funcionários e pedidos
let clientes_id = 0
let funcionarios_id = 0
let pedidos_id = 0

//os bancos de dados do sistema
let cadastros = []
let clientes = []
let funcionarios = []
let pedidos = []
let produtos = []

let login_status = -1
let login_conta = 0

//variável que indica se o programa encerrará ou não
//manipulada pelo método sair() da classe Sistema
let sair = false

class Pedido{
    constructor(id_pedido, id_cliente, status, data_pedido){
        this.id_pedido = id_pedido
        this.id_cliente = id_cliente
        this.status = status
        this.data_pedido = data_pedido
    }
}

class Funcionário{
    constructor(id_funcionario, nome, cpf, email, senha){
        this.id_funcionario = id_funcionario
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.senha = senha
    }
}

class Cliente{
    constructor(id_cliente, nome, data_nascimento, cpf, email, senha){
        this.id_cliente = id_cliente
        this.nome = nome
        this.data_nascimento = data_nascimento
        this.cpf = cpf
        this.email = email
        this.senha = senha
    }
}

class Produto{
    constructor(validade, preço, quantidade_estoque, nome, descrição){
        this.validade = validade
        this.preço = preço
        this.quantidade_estoque = quantidade_estoque
        this.nome = nome
        this.descrição = descrição
    }
}

class Sistema{
    cadastro(){

        let conta = prompt("cliente ou funcionário: ")
        
        //usuário escreveu: "cliente"
        //cliente = 0 nos cadastros
        if(conta=="cliente"){ 
            let nome = prompt("digite o seu nome: ")
            let data_nascimento = prompt("digite a sua data de nascimento: ")
            let cpf = prompt("digite o seu cpf: ")
            let email = prompt("digite o seu email: ")

            //Não permite dois emails iguais nos cadastros
            for (let i = 0; i < cadastros.length; i++) {
                if (cadastros[i][0] == email) {
                  console.log("Email já cadastrado")
                  return
                }
            }
            let senha = prompt("crie a sua senha: ")

            //cria um novo cadastro
            let cadastro = [email,senha,0]
            cadastros.push(cadastro)

            //cria um novo cliente
            let new_cliente = new Cliente(clientes_id, nome, data_nascimento, cpf, email, senha)
            clientes_id++
            clientes.push(new_cliente)

            console.log("Cadastro criado")

            return
        }
        
        //usuário escreveu: "funcionário"
        //funcionário = 1 nos cadastros
        else if(conta=="funcionário"){
            let nome = prompt("digite o seu nome: ")
            let cpf = prompt("digite o seu cpf: ")
            let email = prompt("digite o seu email: ")

            //Não permite dois emails iguais nos cadastros
            for (let i = 0; i < cadastros.length; i++) {
                if (cadastros[i][0] == email) {
                  console.log("Email já cadastrado")
                  return
                }
            }
            let senha = prompt("crie a sua senha: ")

            //cria um novo cadastro
            let cadastro = [email,senha,1]
            cadastros.push(cadastro)

            //cria um novo funcioário
            let new_funcionario = new Funcionário(funcionarios_id, nome, cpf, email, senha)
            funcionarios_id++
            funcionarios.push(new_funcionario)

            console.log("Cadastro criado")

            return
        }

        //usuário escreveu uma entrada não válida
        else{
            console.log("Entrada não reconhecida\n")

            return
        }
    }

    login(){
        let email = prompt("digite o seu email: ")

        //Procura email nos cadastros
        for (let i = 0; i < cadastros.length; i++) {

            //Encontrou email nos cadastros
            if (cadastros[i][0] == email) {
                let senha = prompt("digite a sua senha: ")

                //Confere se a senha está correta
                if(cadastros[i][1] == senha){

                    //login como cliente
                    if(cadastros[i][2]==0){
                        login_status=0
                        login_conta=email

                        console.log("Logado")

                        return
                    }

                    //login como funcionário
                    if(cadastros[i][2]==1){
                        login_status=1
                        login_conta=email

                        console.log("Logado")

                        return
                    }
                }

                //Senha incorreta
                else{
                    console.log("Senha incorreta\n")

                    return
                }
            }
        }

        //Email incorreto
        console.log("Email não encontrado")

        return
    }

    sair(){
        sair = true

        return
    }

    ver_dados(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            //Procura Funcionário na lista de funcionários
            for (let index = 0; index < funcionarios.length; index++) {
                //Encontrou o Funcionário
                if(funcionarios[index].email==login_conta){
                    //Imprime os dados do funcionário na tela
                    console.log(funcionarios[index])

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            //Procura cliente na lista de clientes
            for (let index = 0; index < clientes.length; index++) {
                //Encontrou o cliente
                if(clientes[index].email==login_conta){
                    //Imprime os dados do funcionário na tela
                    console.log(clientes[index])

                    return
                }
            }
        }
    }

    modificar_dados(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            //Procura Funcionário na lista de funcionários
            for (let index = 0; index < funcionarios.length; index++) {
                //Encontrou o Funcionário
                if(funcionarios[index].email==login_conta){
                    //Pergunta quais os dados novos
                    let nome = prompt("digite o seu nome: ")
                    let cpf = prompt("digite o seu cpf: ")
                    
                    //Altera os dados
                    funcionarios[index].nome = nome
                    funcionarios[index].cpf = cpf

                    console.log("Dados alterados")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            //Procura cliente na lista de clientes
            for (let index = 0; index < clientes.length; index++) {
                //Encontrou o cliente
                if(clientes[index].email==login_conta){
                    //Pergunta quais os dados novos
                    let nome = prompt("digite o seu nome: ")
                    let cpf = prompt("digite o seu cpf: ")
                    let data_nascimento = prompt("digite a sua data de nascimento: ")
                    
                    //Altera os dados
                    clientes[index].nome = nome
                    clientes[index].cpf = cpf
                    clientes[index].data_nascimento = data_nascimento

                    console.log("Dados alterados")

                    return
                }
            }
        }
    }

    ver_produtos(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
    
            return
        }

        //Tem um funcionário ou cliente logado
        else {
            console.log(produtos.sort(ordem_alfabetica))
        }
    }

    ver_pedidos(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log(pedidos.sort(ordem_cronologica))

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    ver_clientes(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log(clientes.sort(ordem_alfabetica))

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    mudar_status_pedido(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            let pedido_id = prompt("Id do pedido: ")

            //Procura Pedido na lista de pedidos
            for (let index = 0; index < pedidos.length; index++) {
                //Encontrou o pedido
                if(pedidos[index].id_pedido==pedido_id){
                    //Pergunta quais os dados novos
                    let novo_status = prompt("digite o novo status: ")
                    
                    //Altera o status
                    pedidos[index].status = novo_status

                    console.log("Status alterado")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    adicionar_produto(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            //Pergunta quais os dados do novo Produto
            let validade = prompt("digite a validade do produto: ")
            let preço = prompt("digite o preço: ")
            let quantidade_estoque = prompt("digite a quantidade em estoque: ")
            let nome = prompt("digite o nome: ")
            let descrição = prompt("digite a descrição do produto: ")
            
            //Cria um novo Produto
            let novo_produto = new Produto(validade, preço, quantidade_estoque, nome, descrição)
            produtos.push(novo_produto)

            console.log("Produto adcionado")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    editar_produto(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            let produto_nome = prompt("Nome do produto: ")

            //Procura Produto na lista de produtos
            for (let index = 0; index < produtos.length; index++) {
                //Encontrou o Produto
                if(produtos[index].nome==produto_nome){
                    //Pergunta quais os dados novos
                    let validade = prompt("digite a validade do produto: ")
                    let preço = prompt("digite o preço: ")
                    let quantidade_estoque = prompt("digite a quantidade em estoque: ")
                    let nome = prompt("digite o nome: ")
                    let descrição = prompt("digite a descrição do produto: ")
                    
                    //Altera os dados
                    produtos[index].validade = validade
                    produtos[index].preço = preço
                    produtos[index].quantidade_estoque = quantidade_estoque
                    produtos[index].nome = nome
                    produtos[index].descrição = descrição

                    console.log("Produto editado")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    excluir_produto(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            let produto_nome = prompt("Nome do produto: ")

            //Procura Produto na lista de produtos
            for (let index = 0; index < produtos.length; index++) {
                //Encontrou o Produto
                if(produtos[index].nome==produto_nome){
                    //Exclui o Produto da lista de produtos
                    produtos[index] = null

                    console.log("Produto excluido")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }
}

function ordem_cronologica(a,b){
    return (a.data_pedido - b.data_pedido)
}

function ordem_alfabetica(a,b){
    return a.nome.localeCompare(b.nome)
}

const sistema = new Sistema()


        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){

        }

        //Tem um cliente logado
        else if(login_status==0){
            
        }

console.log("Bem vindo")
console.log("Faça o seu cadastro ou login")

let comando = ""

//Interface do programa
while(!sair){
    comando = prompt("Digite o comando: ")

    if(comando == "Fazer login"){
        sistema.login()
    }

    else if(comando == "Fazer cadastro"){
        sistema.cadastro()
    }

    else if(comando == "Sair"){
        sistema.sair()
    }

    else if(comando == "Ver meus dados"){
        sistema.ver_dados()
    }

    else if(comando == "Modificar meus dados"){
        sistema.modificar_dados()
    }

    else if(comando == "Ver lista de produtos"){
        sistema.ver_produtos()
    }
}
