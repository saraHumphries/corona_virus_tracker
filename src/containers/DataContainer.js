import { useState, useEffect } from "react";
import DataList from "../components/DataList";
import DataVisualiser from "../components/DataVisualiser";
import './DataContainer.css';

const DataContainer = function() {

    const [dataAPI, setDataAPI] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);


    useEffect(() => {
        fetchDataAPI();
    }, []);


    const fetchDataAPI = function () {
        const dataAPI = fetch('https://api.coronavirus.data.gov.uk/v1/data')
            .then(result => result.json())
            .then(API => setDataAPI(API.data.splice(0,30)));
        
    };

    const onDateClick = function(day) {
        setSelectedDate(day);
    };




    return (
        <div className="container">
            { dataAPI? <DataList data={dataAPI} onDateClick={onDateClick}></DataList> : null}
            { selectedDate? <DataVisualiser selectedDate={selectedDate}></DataVisualiser> : null}
        </div>
    );
};

export default DataContainer;