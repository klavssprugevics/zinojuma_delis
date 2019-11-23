import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './AddLekcijaLayout.scss';
import './../../utils/Design.scss';

class AddLekcija extends Component{

    constructor()
    {
        super();

        //Lai uzstādītu default date, nepieciešams to pārveidot par iso string
        //https://stackoverflow.com/questions/49277112/react-js-how-to-set-a-default-value-for-input-date-type
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 3);
        const date = currentDate.toISOString().substr(0,10);

        this.state = 
        {
            submitPressed: false,
            selectLabel: "TimeklaTehn",
            datums: date,
            laiks: "12:00",
            kabinets: "",
            statuss: ""
        }
        this.ParseInput = this.ParseInput.bind(this);
    }

    ParseInput()
    {
        const datums = this.state.datums;
        const laiks = this.state.laiks;
        const kabinets = this.state.kabinets;
        const statuss = this.state.statuss;
        let kurss = "";

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


        axios.post("http://localhost:5000/api/lekcijas", data)
        .then(response => 
        {
            console.log(response)
            this.setState({submitPressed: true});
        })
        .catch(error => console.log(error));

    }


    updateInput(event)
    {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
          });

    }

    render()
    {
        if(this.state.submitPressed)
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
                
                <input className="nosaukums" name="kabinets" type="text" placeholder="Kabinets" value={this.state.kabinets} onChange={evt => this.updateInput(evt)} /><br/>
                
                <select className="selectBox" name="statuss" value={this.state.statuss} onChange={evt => this.updateInput(evt)}>
                    <option value="Notiek">Notiek</option>
                    <option value="Atcelts">Atcelts</option>
                </select>

                <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
        );
        }
    }

}

export default AddLekcija;