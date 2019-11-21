import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './StudijasPievienotLekcija.scss';
import axios from 'axios';

class StudijasPievienotLekcija extends Component{

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
        }
        this.ParseInput = this.ParseInput.bind(this);
        this.ChangeInput = this.ChangeInput.bind(this);
    }

    ParseInput()
    {
        const datums = this.state.datums;
        const laiks = this.state.laiks;
        const kabinets = this.state.kabinets;
        const statuss = "Notiek";
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

    ChangeInput(event) {
        this.setState({
            selectLabel: event.target.value,
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
            <div className="forma"> 
                <span className="pievienotLekcijuVirsraksts">Pievienot jaunu lekciju!</span>
                
                <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                    <option value="TimeklaTehn">Tīmekļa tehnoloģijas 2019</option>
                    <option value="dbteh">Datu bāzu tehnoloģijas 2019</option>
                </select>

                <input className="datumsInput" name="datums" type="date" value={this.state.datums} onChange={evt => this.updateInput(evt)}></input>
                <input className="laiksInput" name="laiks" type="time" value={this.state.laiks} onChange={evt => this.updateInput(evt)}></input>
                
                <input className="textInput" name="kabinets" type="text" placeholder="Kabinets" value={this.state.kabinets} onChange={evt => this.updateInput(evt)} /><br/>
 
                <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
        );
        }
    }

}

export default StudijasPievienotLekcija;