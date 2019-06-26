import React, { Component } from 'react'
import axios from 'axios'
import {Spinner} from 'reactstrap'
import MainPage from './MainPage'

class HandleAPI extends Component{
    constructor(props){
        super(props)

        this.state={
            result:[],
            isLoaded:false
        }
    }


    componentDidMount(){
        axios.get('api/items')
            .then(result=>{
                this.setState({
                    result:result.data,
                    isLoaded:true
                })
            })
    }

    render(){
        return(
            <div>
               {
                   this.state.isLoaded ?  <MainPage result={this.state.result}/>  : <div className="text-center"> <Spinner color="danger" /> </div>
               }
            </div>
        )
}

}

export default HandleAPI