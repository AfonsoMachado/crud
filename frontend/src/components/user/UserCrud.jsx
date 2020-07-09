import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

// Propriedades a serem passadas para o header para o caso da pagina de usuario
const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir'
}

// Local aonde estão armazenados os usuarios
const baseUrl = 'http://localhost:3001/users'
// Estado inicial do componente
const initialState = {
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {

    //inicializando o atributo state do componente
    state = { ...initialState }

    // Chamada quando o componente é exibido na tela
    componentWillMount() {
        // Trazendo todos os usuarios do servidor
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data }) 
        })
    }

    // Função para limpar o formulario, limpar o user
    clear() {
        this.setState({ user: initialState.user})
    }

    // Incluir um novo usuario (POST) e alterar um usuario existente (PUT)
    save() {
        const user = this.state.user
        //Se for um id válido, é true, então trata-se de uma operação de pt, para alterar
        // Caso seja um id invalido, será uma operação de post
        const method = user.id ? 'put' : 'post'
        // Se for um id válido, passa a url referente ao id 
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        console.log(user)
        // Resposavel pela inserção no db.json
        axios[method](url, user)
            .then(resp => {
                // Passando usuario obtido atraves do webservice
                const list = this.getUpdatedList(resp.data)
                // Limpando o formulário e atualizando a lista local de usuários
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        // Gerando uma lista removendo o usuario que foi passado por parametro
        const list = this.state.list.filter(u => u.id !== user.id)
        // Colocando o elemento na primeira posição
        if(add) list.unshift(user)

        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        // Procura a propriedade dentro de user, usando o nome de input
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e=> this.updateField(e)} placeholder="Digite o nome..."/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e=> this.updateField(e)} placeholder="Digite o e-mail..."/>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false) //filtrando os usuarios
            //Atualizando a lista removendo o usuario
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Função para renderizar as linhas */}
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // Função par renderizar as linhas da tabela
    renderRows() {
        return this.state.list.map( user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>l
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>

        )
    }
}