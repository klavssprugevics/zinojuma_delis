import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import './AddLekcijaLayout.scss';
import './../../utils/Design.scss';

// Komponente, kas nodrošina Lekciju ievietošanu datubāzē.
class AddLekcija extends Component{

    constructor()
    {
        super();

        // Lai uzstādītu default date, nepieciešams to pārveidot par iso string.
        // https://stackoverflow.com/questions/49277112/react-js-how-to-set-a-default-value-for-input-date-type
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const date = currentDate.toISOString().substr(0,10);

        this.state = 
        {
            selectLabel: "TimeklaTehn",
            datums: date,
            laiks: "12:00",
            kabinets: "",
            statuss: "Notiek",
            errors: {},
            submitPressed: false,
            isFormCorrect: true,
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
        else if(this.state.selectLabel === "sm")
            kurss = "Skaitliskās metodes";
        else if(this.state.selectLabel === "vpl")
            kurss = "Vizuālās programmēšans valodas"; 

        const data = {
            "kurss": kurss,
            "datums": datums,
            "laiks": laiks,
            "kabinets": kabinets,
            "statuss": statuss
        };

        // ~~~ Validācijas ~~~
        
        let isFormCorrect = true;
        let errors = {};
        const kabinetaRegex = /^[A-E][0-9]{3}$$/;

        // Kabinets nedrīkst būt tukšs, kā arī, tam jābūt formā: "(burts no A-E)(3 cipari)"
        if(kabinets === "")
        {
            isFormCorrect = false;
            errors["kabinets"] = "'Nosaukums' nevar būt tukšs.";
        }
        else if(!kabinetaRegex.test(kabinets))
        {
            isFormCorrect = false;
            errors["kabinets"] = "Kabineta nosaukums ir formā: (burts no A-E)(3 cipari), piem., C123";
        }

        // Specifiski izvēlēts konstruktors, jo mēneši Date objektā skaitās no 0.
        const chosenDate = new Date(datums.slice(0,4),datums.slice(5,7)-1,datums.slice(8,11));
        chosenDate.setHours(laiks.slice(0,2), laiks.slice(3,5));

        // Pārbauda, vai izvēlētais datums nav pagātnē.
        if(chosenDate < new Date())
        {
            isFormCorrect = false;
            errors["datums"] = "Laiks nevar tikt izvēlēts pagātnē.";
        }

        if(isFormCorrect)
        {
            axios.post("http://localhost:5000/api/lekcijas", data)
            .then(response => 
            {
                this.setState({submitPressed: true});
            })
            .catch(error => console.log(error));
        }
        this.setState({
            isFormCorrect,
            errors
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
                
                <select className="selectBox2" name="selectLabel" value={this.state.selectLabel} onChange={evt => this.updateInput(evt)}>
                    <option value="TimeklaTehn">Tīmekļa tehnoloģijas 2019</option>
                    <option value="dbteh">Datu bāzu tehnoloģijas 2019</option>
                    <option value="sm">Skaitliskās metodes</option>
                    <option value="vpl">Vizuālās programmēšans valodas</option>
                </select>

                <input className="datumsInput" name="datums" type="date" value={this.state.datums} onChange={evt => this.updateInput(evt)}></input>
                <input className="laiksInput" name="laiks" type="time" value={this.state.laiks} onChange={evt => this.updateInput(evt)}></input>
                <div className="errorMsg">{this.state.errors.datums}</div>
                
                <input className="textInput" name="kabinets" type="text" placeholder="Kabinets" value={this.state.kabinets} onChange={evt => this.updateInput(evt)} /><br/>
                <div className="errorMsg">{this.state.errors.kabinets}</div>
             
                <select className="selectBox2" name="statuss" value={this.state.statuss} onChange={evt => this.updateInput(evt)}>
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
