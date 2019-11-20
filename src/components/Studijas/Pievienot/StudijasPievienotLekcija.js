import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './StudijasPievienotLekcija.scss';


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
            laiks: "12:00"
        }
        this.ParseInput = this.ParseInput.bind(this);
    }

    ParseInput()
    {
        console.log(this.state.datums);
        console.log(this.state.laiks);

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
        return(
            <div className="forma"> 
                <span className="pievienotLekcijuVirsraksts">Pievienot jaunu lekciju!</span>
                
                <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                    <option value="TimeklaTehn">Tīmekļa tehnoloģijas 2019</option>
                    <option value="dbteh">Datu bāzu tehnoloģijas 2019</option>
                </select>

                <input type="date" value={this.state.datums} onChange={evt => this.updateInput(evt)}></input>
                <input type="time" value={this.state.laiks} onChange={evt => this.updateInput(evt)}></input>

                <button className="buttonPievienot" type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
        );
    }

}

export default StudijasPievienotLekcija;