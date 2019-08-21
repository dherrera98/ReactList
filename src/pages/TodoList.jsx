import React, { Component } from 'react'
import "./TodoList.css"
import ListTask from '../components/ListTask';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import "../shared.css"
import { toast } from "bulma-toast";
import { uri } from "../plugin/graphql"


export default class TodoList extends Component {

    constructor(props){
        super(props)

        this.state = {
            tasks: [],
            tarea: "",
            loaded: false
        }
    }

    addTask = event =>{

        if(this.state.tarea !== ""){
            if(event.key === "Enter" || event.key === undefined ){
                var client = new ApolloClient({
                    uri,
                });
    
                const addTaskQuery = gql `mutation insert_tasks($name: String){
                    insert_tasks(objects: {name: $name}) {
                        returning {
                        id
                        name
                        createTo
                        }
                    }
                    }`
    
                client.mutate({mutation: addTaskQuery,
                     variables:{name: this.state.tarea}})
                     .then(res => {
                        this.setState({
                           tasks: this.state.tasks.concat(res.data.insert_tasks.returning),
                           tarea: ""
                        })
    
                        document.getElementById("inputNewTarea").value = ""

                        toast({message: "Added successfully", type: "is-success"})
                        })
                        .catch(err => {
                            toast({message: "Error adding", type: "is-danger"})

                        })
            }
        }
    }

    reloadTask = () => {        
        const client = new ApolloClient({
            uri,
          });


        client.query({query: gql`{  
            tasks(order_by: {createTo: asc}, where: {active: {_eq: true}}) {
                id
                name
                completed
                createTo
            }
          }`}).then(result=>{
            this.setState({
                loaded: true
            })
            if(this.state.tasks.length !== result.data.tasks.length){
                this.setState({tasks: []})
                this.setState({tasks: this.state.tasks.concat(result.data.tasks)})
            }
            }).catch(err => {
                toast({message: "Error taking data", type: "is-danger"})                
            })

    }

    removeTask = (position) => {
        const array = [...this.state.tasks]
        array.splice(position, 1)

        this.setState({
            tasks: array
        })
    }

    updateTask = (position) => {
        let newTasks = [...this.state.tasks]
        newTasks[position].completed = !newTasks[position].completed

        this.setState({
            tasks: newTasks
        })
    }

    render() {
        return (
            <div className="container">
                <div className="columns h1-container">
                    <h1>TodoList</h1>
                </div>
                
                {this.state.loaded ? (
                    <>
                        <div className="columns newtask">
                            <input className="input" type="text" placeholder="Introduce taréa" onKeyDown={this.addTask} id="inputNewTarea" onChange={(elem)=>{this.setState({tarea: elem.target.value})}}/>
                            <a className="button is-link" onClick={this.addTask}>Add</a>
                        </div>
                        <ListTask tasks={this.state.tasks} actionRemove={this.removeTask} actionUpdate={this.updateTask}></ListTask>
                    </>
                ) : (
                    <>                    
                        <div className="columns newtask">
                            <input className="input" type="text" placeholder="Introduce taréa" id="inputNewTarea" disabled/>
                            <a className="button is-link" disabled>Add</a>
                        </div>                        
                        <img src="https://avatars2.githubusercontent.com/u/39895671?s=400&v=4" alt="logo" className="logo loading"/>
                    </>
                ) 
            
            }
            </div>
        )
    }

    componentDidMount(){
        this.reloadTask();

        setInterval(()=>{
            this.reloadTask();
        }, 500)
    }
}
