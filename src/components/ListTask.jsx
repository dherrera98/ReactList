import React, { Component } from 'react'
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import "../shared.css"
import { toast } from "bulma-toast";
import { uri } from "../plugin/graphql"



export default class ListTask extends Component {
    constructor(props){
        super(props)
    }

    remove = (id) => {
        const removeTask = gql`
            mutation removeTask($id: Int){
            update_tasks(where: {id: {_eq: $id}}, _set: {active: false}) {
                returning {
                id
                name
                completed
                createTo
                active
                }
            }
        }

        `

        var client = new ApolloClient({
            uri,
        });

        client.mutate({
            mutation: removeTask, 
            variables: {
            id
        }}).then(res => {
            const position = this.props.tasks.findIndex(x => x.id === id);
            this.props.action(position)
            toast({message: "Successfully removed", type: "is-warning"})
        }).catch(err =>{
            toast({message: "Error removing", type: "is-danger"})
        })
    }

    completed = (id) => {
        const completedTask = gql `
        mutation complete_task($term: Boolean, $id: Int){
            update_tasks(where: {id: {_eq: $id}}, _set: {completed: $term}) {
                returning {
                id
                name
                completed
                }
            }
            }

        `

        var client = new ApolloClient({
            uri,
        });


        const nowIsCompleted = (id)=> {
            var taskCompleted = undefined;

            this.props.tasks.forEach(task => {
                
                if(task.id === id){
                    taskCompleted = task.completed
                }
            });

            return !taskCompleted;
        }


        client.mutate({
            mutation: completedTask,
            variables:{
                id: id,
                term: nowIsCompleted(id)
            }
        }).then(res => {
            const position = this.props.tasks.findIndex(x => x.id === id);
            this.props.actionUpdate(position)
            toast({message: "Successfully modified", type: "is-success"})
        }).catch(err =>{
            toast({message: "Error modified", type: "is-danger"})
        })
        
    }

    getFullDate = (dateTask) => {
        let date = new Date(dateTask)
        let dateFormat = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "  -  " + date.getHours() + ":" + date.getMinutes();
        return dateFormat
    }

    render() {
        return (
          <div className="panel list-group columns list-container">
              {this.props.tasks.map(task=>(
                    <a key={task.id} className="panel-block list-group-item is-primary item item_a">
                        <span className={task.completed ? "completed" : ""}>
                            {task.name} 
                        </span>

                        <div>
                            {
                                task.completed ?  
                                (<button className="button is-info is-outlined is-small" onClick={() => {this.completed(task.id)}}>Incompleted</button>)
                                :
                                (<button className="button is-primary is-outlined is-small" onClick={() => {this.completed(task.id)}}>Completed</button>)
                            }

                            <button className="button is-danger is-outlined is-small" onClick={() => {this.remove(task.id)}}>Remove</button>
                        </div>

                        <span className="date">{this.getFullDate(task.createTo)}</span>

                    </a>
              ))}
          </div>
        )
    }
}
