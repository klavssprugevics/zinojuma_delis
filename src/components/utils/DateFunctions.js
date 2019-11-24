import React from 'react';

// Funkcija, kas pārveido timestamp par datumu
export const timestampToDate = (seconds) => 
{
    // Pārveido timestamp par datumu
    const date = new Date(seconds * 1000);
    
    // Iegūst datuma vērtības, pārveido, ja nepieciešams.
    const gads = date.getFullYear();
    const menesis =  oneDigitDateToTwoDigits(date.getMonth() + 1);
    const diena =  oneDigitDateToTwoDigits(date.getDate());

    //Pārveido laika vērtības, pārveido, ja nepieciešams.
    const minutes = oneDigitDateToTwoDigits(date.getMinutes());
    const stundas = oneDigitDateToTwoDigits(date.getHours());
    
    const datums = diena + "." + menesis + "." + gads;
    const laiks = stundas + ":" + minutes;

    // Lai būtu pirmais vārds boldā
    var divStyle =
    {
        fontWeight:'bold'
    };

    return(
        <div>
            <span style={divStyle}>Pievienots: </span>
            <span>{datums}</span>
            <span> {laiks}</span>
        </div>
    )
};

// Pārveido ciparu, kas <10 un >= 0 par 2 ciparu skaitli
const oneDigitDateToTwoDigits = (number) =>
{
    if(number === 0)
    {
        number = "00";
    }
    else if(number < 9)
    {
        number = "0" + number;
    }
    return number;
}
