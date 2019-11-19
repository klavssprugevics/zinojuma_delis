import React, {Component} from 'react';
import './AktualitatesLabot.scss';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class AktualitatesLabot extends Component{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            isLoaded: false,
            nosaukums: '',
            apraksts: '',
            autors: '',
            submitPressed: false,
            deleted: false,
        }
        this.ParseInput = this.ParseInput.bind(this);
        this.DeletePost = this.DeletePost.bind(this);

    }

    componentDidMount()
    {
        console.log(this.props.match.params.id);
        this.getData();
    }

    getData()
    {
        // Atgūstam konkrēto aktualitāti
        axios.get(`http://localhost:5000/api/aktualitates/` + this.props.match.params.id)
        .then(res =>
        {
            this.setState({nosaukums: res.data.nosaukums,
                apraksts: res.data.apraksts,
                autors: res.data.autors,
                isLoaded: true});
        })
        .catch((error) =>
        {

        })
                
    }

    updateInput(event)
    {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
          });
    }

    ParseInput()
    {
        // Pārbaude -> nevar būt mazāk par 5 simboliem un saturēt tikai no simboliem.

        const data = {
            "nosaukums": this.state.nosaukums,
            "apraksts": this.state.apraksts,
            "autors": this.state.autors
        };

        axios.put("http://localhost:5000/api/aktualitates/" + this.props.match.params.id, data)
        .then(response => 
        {
            this.setState({submitPressed: true});
        })
        .catch(error => console.log(error));


    }

    DeletePost()
    {
        console.log("this post has been deleted!");
        axios.delete('http://localhost:5000/api/aktualitates/' + this.props.match.params.id)
        .then(res =>
        {
            this.setState({deleted:true});
        });

    }


    render()
    {
        if(!this.state.isLoaded)
        {
            return(
                <h1 className="loading">Uzgaidi, kamēr atgūstam informāciju...</h1>
                )
        }
        else
        {
            if(this.state.submitPressed || this.state.deleted)
            {
                return <Redirect to="/aktualitates" />
            }
            else
            {
                return(
                    <div className="editFields">
                        <span className="editAktVirsraksts">Labošana...</span>
                        
                        <input className="textInput" name="nosaukums" type="text" placeholder="Nosaukums" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} /><br/>
                        <textarea className="textareaInput" name="apraksts" type="text" placeholder="Apraksts" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} /><br/>
                        <input className="textInput" name="autors" type="text" placeholder="Autors" value={this.state.autors} onChange={evt => this.updateInput(evt)} /><br/>

                        <button className="buttonLabot" type="button" onClick={this.ParseInput}>Labot!</button> 
                        <button className="buttonDzest" type="button" onClick={this.DeletePost}>Dzēst!</button> 

                    </div>)
            }
        }
    }

}

export default AktualitatesLabot;