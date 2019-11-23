import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './EditLekcijaLayout.scss';
import './../../utils/Design.scss';

class EditLekcija extends Component{

    constructor(props)
    {
        super(props);

        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 3);
        const date = currentDate.toISOString().substr(0,10);

        this.state=
        {
            isLoaded: false,
            kurss: "",
            datums: date,
            laiks: "12:00",
            kabinets: "",
            statuss: "",
            deleted: false,
            selectLabel: ""

        }
        this.ParseInput = this.ParseInput.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
    }

    componentDidMount()
    {
        this.getData();
    }

    
    getData()
    {
        // Atgūstam konkrēto aktualitāti
        axios.get(`http://localhost:5000/api/lekcijas/` + this.props.match.params.id)
        .then(res =>
        {
            
        if(res.data.kurss === "Tīmekļa tehnoloģijas 2019")
            this.setState({selectLabel: "TimeklaTehn"});
        else if(res.data.kurss === "Datu bāzu tehnoloģijas 2019")
            this.setState({selectLabel: "dbteh"});

            this.setState({kurss: res.data.kurss,
                datums: res.data.datums,
                laiks: res.data.laiks,
                kabinets: res.data.kabinets,
                statuss: res.data.statuss,
                isLoaded: true});
        })
        .catch((error) =>
        {
            //TODO
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
        const datums = this.state.datums;
        const laiks = this.state.laiks;
        const kabinets = this.state.kabinets;
        const statuss = this.state.statuss;
        let kurss = this.state.kurss;

        if(this.state.selectLabel === "TimeklaTehn")
            kurss = "Tīmekļa tehnoloģijas 2019";
        else if(this.state.selectLabel === "dbteh")
            kurss = "Datu bāzu tehnoloģijas 2019";

            
        const data = {
            "kurss": kurss,
            "datums": datums,
            "laiks": laiks,
            "kabinets": kabinets,
            "statuss": statuss
        };

        console.log(data);
        axios.put("http://localhost:5000/api/lekcijas/" + this.props.match.params.id, data)
        .then(response => 
        {
            this.setState({submitPressed: true});
        })
        .catch(error => console.log(error));
    }





    DeletePost()
    {
        console.log("this post has been deleted!");
        axios.delete('http://localhost:5000/api/lekcijas/' + this.props.match.params.id)
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
                return <Redirect to="/studijas" />
            }
            else
            {
                return(
                    <div className="lekcijaForma"> 
                    <span className="virsraksts">Pievienot lekciju izmaiņas!</span>
                    
                    <select className="selectBox" name="selectLabel" value={this.state.selectLabel} onChange={evt => this.updateInput(evt)}>
                        <option value="TimeklaTehn">Tīmekļa tehnoloģijas 2019</option>
                        <option value="dbteh">Datu bāzu tehnoloģijas 2019</option>
                    </select>
    
                    <input className="datumsInput" name="datums" type="date" value={this.state.datums} onChange={evt => this.updateInput(evt)}></input>
                    <input className="laiksInput" name="laiks" type="time" value={this.state.laiks} onChange={evt => this.updateInput(evt)}></input>
                    
                    <input className="apraksts" name="kabinets" type="text" placeholder="Kabinets" value={this.state.kabinets} onChange={evt => this.updateInput(evt)} /><br/>
                    
                    <select className="selectBox" name="statuss" value={this.state.statuss} onChange={evt => this.updateInput(evt)}>
                        <option value="Notiek">Notiek</option>
                        <option value="Atcelts">Atcelts</option>
                    </select>
    
                    <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
                    <button className="buttonDzest" type="button" onClick={this.DeletePost}>Dzēst!</button> 

                </div>
                )
            }
        }

    }
}


export default EditLekcija;