import React from 'react';
import Spinner from 'react-spinkit';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/ru';
import Input from '../../common/Input';
import Button from '../../common/Button';
import TimeHelper from '../../../utils/timeHelper';
import 'react-day-picker/lib/style.css';
import './WorkCalendar.css';


export default class WorkCalendar extends React.Component {
    state = {
        totalTime: '0m',
        isTimeStampChange: false,
        timeStampChanged: null
    }

    componentDidMount() {
        let date = new Date();
        this.loadTimeStamps(date.getFullYear(), date.getMonth());
    }
    

    onMonthChange = date => {
        this.loadTimeStamps(date.getFullYear(), date.getMonth());
    }

    loadTimeStamps = (year, month) => {
        let firstDay = moment(new Date(year, month)).format('YYYY.MM.DD');
        let lastDay = moment(new Date(new Date(year, month + 1) - 1)).format('YYYY.MM.DD');

        this.props.userActions.loadTimeStamps(this.props.user.info.id, firstDay, lastDay)
            .then(() => {
                this.setState({ totalTime: TimeHelper.getTotalTime(this.props.user.ts.map(timeStamp => timeStamp.workedTime)) });
            });
    } 

    onDayClick = (date, { selected }) => {
        let timeStamp = selected ? TimeHelper.parseToJiraStyle(
            this.props.user.ts.find(item => {
                return (item.date.getFullYear() === date.getFullYear() &&
                    item.date.getMonth() === date.getMonth() &&
                    item.date.getDate() === date.getDate());
            }).workedTime) : null;

        this.setState({
            isTimeStampChange: true,
            timeStampChanged: {
                date,
                timeStamp 
            }
        });
    }

    onChangeTime = e => {
        e.preventDefault();
        let time = TimeHelper.parseFromJiraStyle(e.target.elements[0].value);
        let date = moment(this.state.timeStampChanged.date).format('YYYY.MM.DD');

        let timeStamp = this.props.user.ts.find(item => {
            return (item.date.getFullYear() === this.state.timeStampChanged.date.getFullYear() &&
                item.date.getMonth() === this.state.timeStampChanged.date.getMonth() &&
                item.date.getDate() === this.state.timeStampChanged.date.getDate());
        });

        let d = this.state.timeStampChanged.date;

        if (timeStamp) {
            this.props.userActions.editTimeStamps(this.props.user.info.id, date, time, timeStamp.id)
                .then(() => {
                    this.setState({
                        isTimeStampChange: false,
                        timeStampChanged: null
                    });
                    this.loadTimeStamps(d.getFullYear(), d.getMonth());
                });
        } else {
            this.props.userActions.editTimeStamps(this.props.user.info.id, date, time)
                .then(() => {
                    this.setState({
                        isTimeStampChange: false,
                        timeStampChanged: null
                    });
                    this.loadTimeStamps(d.getFullYear(), d.getMonth());
                });
        }
    }

    closeChangeTimeForm = () => {
        this.setState({
            isTimeStampChange: false,
            timeStampChanged: null
        });
    }

    render() {
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };

        return (<div className="work-calendar">
            <DayPicker
                localeUtils={MomentLocaleUtils}
                locale='ru'
                onDayClick={this.onDayClick}
                selectedDays={this.props.user.ts.map(timeStamp => timeStamp.date)}
                onMonthChange={this.onMonthChange}
            />
            <div className="work-calendar__worked-time">Отработанное время за этот месяц: {this.state.totalTime}</div>
            {this.props.user.isTSLoading && <div className="work-calendar__loading-wrapper">
                <Spinner name="three-bounce" className="work-calendar__loading-spinner" />
            </div>}
            {this.state.isTimeStampChange && <div className="work-calendar__time-wrapper">
                <div className="work-calendar__date">{this.state.timeStampChanged.date.toLocaleString("ru", options)}</div>
                <form className="work-calendar__form" onSubmit={this.onChangeTime} >
                    <Input type="text" className="work-calendar__time" placeholder="Время" defaultValue={this.state.timeStampChanged.timeStamp} autoFocus />
                    <Button value="Изменить" />
                </form>
                <Button value="Отменить" onClick={this.closeChangeTimeForm} />
            </div>}
        </div>);
    }
}