import React from 'react';
import Modal from 'react-modal';
import './EditEmployeeForm.css';


export default class EditEmployeeModal extends React.Component {
    editEmployee = () => {
        this.props.editEmployee(this._formEl);
    }

    getFormRef = node => {
        this._formEl = node;
    }

    render() {
        let employee = this.props.employee;
        return (<form className="edit-employee-form" ref={this.getFormRef}>
            <div className="edit-employee-form__first-line">
                <input type="text" className="edit-employee-form__input" placeholder="ID" name="id" defaultValue={employee.id} readOnly={true} />
                <input type="text" className="edit-employee-form__input" placeholder="Фамилия" name="lastName" defaultValue={employee.lastName} />
                <input type="text" className="edit-employee-form__input" placeholder="Имя" name="firstName" defaultValue={employee.firstName} />
                <input type="text" className="edit-employee-form__input" placeholder="Отчество" name="middleName" defaultValue={employee.middleName} />
            </div>
            <div className="edit-employee-form__second-line">
                <div className="edit-employee-form__ok-button" onClick={this.editEmployee}>Изменить</div>
            </div>
        </form>);
    }
}