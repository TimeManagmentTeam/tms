import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/ru';
import Spinner from 'react-spinkit';
import './WorkCalendar.css';


let daysMarch = [
    {
        date: new Date('March 2 2018 12:00:00 GMT+0500(RTZ 4 (зима))'),
        workedTime: '08:00:00'
    },
    {
        date: new Date('March 4 2018 12:00:00 GMT+0500(RTZ 4 (зима))'),
        workedTime: '02:00:00'
    },
    {
        date: new Date('March 14 2018 12:00:00 GMT+0500(RTZ 4 (зима))'),
        workedTime: '05:00:00'
    }
];

let daysApril = [
    {
        date: new Date('Apr 1 2018 12:00:00 GMT+0500(RTZ 4 (зима))'),
        workedTime: '10:00:00'
    },
    {
        date: new Date('Apr 9 2018 12:00:00 GMT+0500(RTZ 4 (зима))'),
        workedTime: '04:30:00'
    },
    {
        date: new Date('Apr 17 2018 12:00:00 GMT+0500(RTZ 4 (зима))'),
        workedTime: '06:00:00'
    }
];


export default class WorkCalendar extends React.Component {
    state = {
        workedDays: [],
        workedTime: '0 часов',
        loading: false,
        isTimeChange: false,
        dateChanged: null,
        timeChanged: null
    }

    componentWillMount() {
        let date = new Date();
        this.loadDays(date.getFullYear(), date.getMonth());
    }

    onMonthChange = date => {
        this.loadDays(date.getFullYear(), date.getMonth());
    }

    onDayClick = (date, { selected }) => {
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };

        let tc = null;
        if (selected) {
            let t = this.state.workedDays.find(day => {
                return (day.date.getFullYear() === date.getFullYear() &&
                    day.date.getMonth() === date.getMonth() &&
                    day.date.getDay() === date.getDay());
            });

            if (t) {
                tc = t.workedTime;
            }
        }

        this.setState({
            isTimeChange: true,
            dateChanged: date.toLocaleString("ru", options),
            timeChanged: tc 
        });
    }

    onChangeTime = e => {
        e.preventDefault();

    }

    getChangeTimeFormRef = node => {
        this._changeTimeFormEl = node;
    }

    loadDays = (year, mounth) => {
        this.setState({ loading: true });

        let firstDay = new Date(year, mounth);
        let lastDay = new Date(new Date(year, mounth + 1) - 1);

        let wd = mounth === 3 ? daysApril : daysMarch;
        let wt = wd.reduce((time, currentTime) => {

        }, '');

        setTimeout(() => {
            this.setState({
                workedDays: wd,
                workedTime: wt,
                loading: false,
            });
        }, 2000);
    } 

    render() {
        return (<div className="work-calendar">
            <DayPicker
                localeUtils={MomentLocaleUtils}
                locale='ru'
                onDayClick={this.onDayClick}
                selectedDays={this.state.workedDays.map(item => item.date)}
                onMonthChange={this.onMonthChange}
            />
            <div className="work-calendar__worked-time">Отработанное время за этот месяц: {this.state.workedTime}</div>
            {this.state.loading && <div className="work-calendar__loading-wrapper">
                <Spinner name="three-bounce" className="work-calendar__loading-spinner" />
            </div>}
            {this.state.isTimeChange && <div className="work-calendar__time-wrapper">
                <div className="work-calendar__date">{this.state.dateChanged}</div>
                <form className="work-calendar__form" ref={this.getChangeTimeFormRef}>
                    <input type="text" className="work-calendar__time" placeholder="Время"
                        defaultValue={this.state.timeChanged} />
                    <input type="submit" className="work-calendar__submit" value="Изменить" onClick={this.onChangeTime} />
                </form>
            </div>}
        </div>);
    }
}