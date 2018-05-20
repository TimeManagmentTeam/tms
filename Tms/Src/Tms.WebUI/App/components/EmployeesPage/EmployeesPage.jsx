import React from 'react';
import ReactTable from 'react-table';
import './EmployeesPage.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import AddEmployeeForm from './AddEmployeeForm';
import Input from '../common/Input';
import Button from '../common/Button';
import moment from 'moment';
import TimeHelper from '../../utils/timeHelper';



export default class EmployeesPage extends React.Component {
    state = {
        isOpenAddForm: false
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let firstDay = moment(new Date(year, month)).format('YYYY-MM-DD');
        let lastDay = moment(new Date(new Date(year, month + 1) - 1)).format('YYYY-MM-DD');

        this.props.userActions.loadSubordinates(firstDay, lastDay);
    }

    openAddForm = () => {
        this.setState((prevState, props) => {
            return {
                isOpenAddForm: !prevState.isOpenAddForm
            };
        })
    }

    removeEmployee = event => {
        this.props.userActions.remove(event.target.getAttribute('data-id'))
            .then(data => {
                let from = this._formEl.elements[0].value;
                let to = this._formEl.elements[1].value;
                this.props.userActions.loadSubordinates(from, to);
            });
    }

    getFormRef = node => {
        this._formEl = node;
    }

    updateTable = e => {
        if (e) {
            e.preventDefault();
        }
        let from = this._formEl.elements[0].value;
        let to = this._formEl.elements[1].value;
        this.props.userActions.loadSubordinates(from, to);
    }

    render() {
        let subordinates = this.props.auth.user.subordinates;
        if (subordinates) {
            subordinates = subordinates.filter(x => x.role === 0);
        }

        let columns = [
            {
                Header: 'ФИО',
                Cell: row => <Link to={`/user/${row.original.id}`}>{row.original.lastName} {row.original.firstName} {row.original.middleName}</Link>
            },
            {
                Header: 'Почта',
                accessor: 'email'
            },
            {
                Header: 'Отработанное время',
                Cell: row => TimeHelper.getTotalTime(row.original.ts.map(timeStamp => timeStamp.workedTime))
            }
        ];

        if (this.props.auth.user.info.role === 2) {
            columns.push(
                {
                    Header: 'Руководитель',
                    Cell: row => <Link to={`/user/${row.original.director.id}`}>{row.original.director.lastName} {row.original.director.firstName} {row.original.director.middleName}</Link>
                }
            );
        }

        columns.push(
            {
                width: 24,
                Cell: row => (<div className="employee-table__remove-button material-icons"
                    data-id={row.original.id} onClick={this.removeEmployee}>clear</div>)
            }
        );


        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let firstDay = moment(new Date(year, month)).format('YYYY-MM-DD');
        let lastDay = moment(new Date(new Date(year, month + 1) - 1)).format('YYYY-MM-DD');

        return (
            <div>
                <div className="employees__add-form">
                    <CSSTransitionGroup transitionName="employees__add-form_open" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                        {this.state.isOpenAddForm && <AddEmployeeForm {...this.props} updateTable={this.updateTable} />}
                    </CSSTransitionGroup>
                </div>
                <div className="employees__add-form-button-container">
                {this.state.isOpenAddForm ?
                    <div className="employees__add-form-button" onClick={this.openAddForm}>
                        Закрыть <span className="material-icons">clear</span>
                    </div> :
                    <div className="employees__add-form-button" onClick={this.openAddForm}>
                        Новый сотрудник <span className="material-icons">add</span>
                    </div>}
                </div>
                <div className="employees-container">
                    <form className="employees_form-options" ref={this.getFormRef}>
                        <Input type="date" name="from" defaultValue={firstDay} />
                        <span>-</span>
                        <Input type="date" name="to" defaultValue={lastDay} />
                        <Button value="Обновить" onClick={this.updateTable} />
                        <Button value="Скачать Excel" />
                    </form>
                    <ReactTable
                        data={subordinates}
                        columns={columns}
                        minRows={0}
                        showPagination={false}
                        defaultPageSize={Number.MAX_VALUE}
                        className='employee-table'
                        loadingText='Загрузка...'
                        noDataText='Пусто'
                        loading={this.props.auth.user.isSubordinatesLoading}
                    />
                </div>
            </div>
        );
    }

}
