import React from 'react';


// Funkcij,kas pārveido timestamp par datumu
export const timestampToDate = (seconds) => 
{
    // Pārveido timestamp par datumu
    const date = new Date(seconds * 1000);
    const datums = date.toDateString();


    // Izgūst vajadzīgās vērtības
    var minutes = date.getMinutes();
    var stundas = date.getHours();

    stundas = oneDigitDateToTwoDigits(stundas);
    minutes = oneDigitDateToTwoDigits(minutes);

    const laiks = stundas + ":" + minutes;
    return(
        <div>
            <span>{datums}</span>
            <span>{laiks}</span>

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