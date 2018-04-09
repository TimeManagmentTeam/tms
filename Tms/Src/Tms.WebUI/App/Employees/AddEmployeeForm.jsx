import React from 'react';
import Modal from 'react-modal';
import './AddEmployeeForm.css';


export default class AddEmployeeModal extends React.Component {
    addEmployee = () => {
        this.props.addEmployee(this._formEl);
    }

    getFormRef = node => {
        this._formEl = node;
    }

    render() {
        return (<form className="add-employee-form" ref={this.getFormRef}>
            <div className="add-employee-form__first-line">
                <input type="text" className="add-employee-form__input" placeholder="Фамилия" name="lastName" />
                <input type="text" className="add-employee-form__input" placeholder="Имя" name="firstName" />
                <input type="text" className="add-employee-form__input" placeholder="Отчество" name="middleName" />
            </div>
            <div className="add-employee-form__second-line">
                <div className="add-employee-form__ok-button" onClick={this.addEmployee}>Создать</div>
            </div>
        </form>);
    }
}