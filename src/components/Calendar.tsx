import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "../Calendar.css";
import { getDate } from "../Date";
import '../App.css';
import { DiaryEntryRecord, getUpdatedEntries } from "../FetchAPI";

const dates = ['2022-09-03', '2022-09-04'];




function CalendarPage() {
    const [value, onChange] = useState(new Date());
    const [completedDates, setCompletedDates] = useState<string[]>([]);

    let navigate = useNavigate();

    let handleClickedDay = (value: Date) => {
        let entryDate = getDate(value);
        navigate("/diary/" + entryDate);
    };
    useEffect(() => {
        getUpdatedEntries().then((entries) => {
            setCompletedDates(entries.map(entry => entry.entry_date));
        });
    }, []);

    let changeBackground = function (props: CalendarTileProperties): string | null {
        let date = getDate(props.date);
        let today = getDate(value);
        if (date === today) {
            return '.react-calendar__tile--active';
        }
        if (completedDates.includes(date)) {
            return 'react-calendar--completed';
        }
        return null
    };

    return (
        <>
            <h3>Select a date to add or view a diary entry</h3>
            <Calendar onChange={onChange} value={value} onClickDay={handleClickedDay} tileClassName={changeBackground} />
        </>
    );
};

export default CalendarPage;
