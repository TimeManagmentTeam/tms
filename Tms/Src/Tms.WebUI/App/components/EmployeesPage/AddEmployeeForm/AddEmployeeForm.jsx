import React from 'react';
import './AddEmployeeForm.css';


export default class AddEmployeeForm extends React.Component {
    state = {
        role: '',
        departmentDirectorId: ''
    };


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    addEmployee = () => {
        this.props.userActions.create(this._formEl)
            .then(data => {
                this.props.updateTable();
            });
    }

    getFormRef = node => {
        this._formEl = node;
    }

    render() {
        let user = this.props.auth.user;

        return (
            <form className="add-employee-form" ref={this.getFormRef}>
                <div className="add-employee-form__column">
                    <input type="text" className="add-employee-form__input" placeholder="Фамилия" name="lastName" />
                    <input type="text" className="add-employee-form__input" placeholder="Имя" name="firstName" />
                    <input type="text" className="add-employee-form__input" placeholder="Отчество" name="middleName" />
                </div>
                <div className="add-employee-form__column">
                    <input type="text" className="add-employee-form__input" placeholder="Почта" name="email" />
                    <input type="password" className="add-employee-form__input" placeholder="Пароль" name="passHash" />
                </div>
                {user.info.role === 2 ? < div className="add-employee-form__column">
                    <select value={this.state.role} onChange={this.handleChange} required className="add-employee-form__input" name="role">
                        <option value="" disabled selected hidden>Роль</option>
                        <option value="0">Сотрудник</option>
                        <option value="1">Руководитель</option>
                    </select>
                    <select value={this.state.directorId} onChange={this.handleChange} required className="add-employee-form__input" name="directorId">
                        <option value="" disabled selected hidden>Руководитель</option>
                        <option value={user.info.id}>{user.info.lastName} {user.info.firstName} {user.info.middleName}</option>
                        {user.subordinates
                            .filter(subordinate => {
                                return subordinate.role === 1;
                            })
                            .map(subordinate => {
                                return <option value={subordinate.id}>{subordinate.lastName} {subordinate.firstName} {subordinate.middleName}</option>;
                            })}
                    </select>
                    <input type="text" style={{ display: "none" }} name="departmentDirectorId" defaultValue={user.info.id} />
                    <div className="add-employee-form__button" onClick={this.addEmployee}>Создать</div>
                </div> :
                    <div className="add-employee-form__column add-employee-form__column-down">
                        <input type="text" style={{ display: "none" }} name="role" defaultValue={0} />
                        <input type="text" style={{ display: "none" }} name="directorId" defaultValue={user.info.id} />
                        <input type="text" style={{ display: "none" }} name="departmentDirectorId" defaultValue={user.info.departmentDirector.id} />
                        <div className="add-employee-form__button" onClick={this.addEmployee}>Создать</div>
                    </div>}
            </form>
        );
    }
}