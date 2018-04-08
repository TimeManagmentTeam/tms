import React from 'react';
import AddEmployeeForm from './AddEmployeeForm.jsx';
import EmployeeTable from './EmployeeTable.jsx';
import { CSSTransitionGroup } from 'react-transition-group';
import './Employees.css';


export default class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            isOpenAddForm: false,
            loading: false
        };
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees = () => {
        this.setState({
            loading: true
        })
        fetch("/api/Employees")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    employees: result,
                    loading: false
                });
            }, (error) => {
                this.setState({
                    employees: [],
                    loading: false
                });
            });
    }

    addEmployee = form => {
        var formData = new FormData(form);
        fetch("/api/Employees/Add", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                this.loadEmployees();
            }, (error) => {
            });
    }

    removeEmployee = id => {
        fetch(`/api/Employees/Remove/${id}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(result => {
                this.loadEmployees();
            }, (error) => {
            });
    }

    editEmployee = form => {
        var formData = new FormData(form);
        fetch("/api/Employees/Edit", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                this.loadEmployees();
            }, (error) => {
            });
    }

    openAddForm = () => {
        this.setState((prevState, props) => {
            return {
                isOpenAddForm: !prevState.isOpenAddForm
            };
        })
    }

    render() {
        return (<div className="employees">
            <div className="employees__header">
                <div className="employees__main-header">
                    <span className="employees__title">Сотрудники</span>
                    <div className="employees__button-open-form" onClick={this.openAddForm}>
                        <span className="employees__button-title">{!this.state.isOpenAddForm ? 'Создать' : 'Закрыть'}</span>
                        <span className="employees__button-icon material-icons">{!this.state.isOpenAddForm ? 'add' : 'close'}</span>
                    </div>
                </div>
                <CSSTransitionGroup transitionName="employees__add-form_open" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {this.state.isOpenAddForm && <AddEmployeeForm addEmployee={this.addEmployee} />}
                </CSSTransitionGroup>
            </div>
            <div className="employees__content">
                <EmployeeTable
                    employees={this.state.employees}
                    removeEmployee={this.removeEmployee}
                    editEmployee={this.editEmployee}
                    loading={this.state.loading}
                />
            </div>
        </div>);
    }
}