import React from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './UserEditForm.css';
import history from '../../../history';


export default class UserEditForm extends React.Component {
    onEdit = e => {
        e.preventDefault();
        let newEmployee = { ...this.props.user.info };
        newEmployee.lastName = e.target.elements[0].value;
        newEmployee.firstName = e.target.elements[1].value;
        newEmployee.middleName = e.target.elements[2].value;
        newEmployee.email = e.target.elements[3].value;
        newEmployee.passHash = e.target.elements[5].value;
        newEmployee.oldPassHash = e.target.elements[4].value;

        this.props.userActions.edit(newEmployee)
            .then(data => {
                history.push(this.props.location.pathname.slice(0, -5));
            });
    }

    render() {
        return (
            <form className="user-edit-form" onSubmit={this.onEdit}>
                <Input type="text" placeholder="Фамилия" defaultValue={this.props.user.info.lastName} autoFocus />
                <Input type="text" placeholder="Имя" defaultValue={this.props.user.info.firstName} />
                <Input type="text" placeholder="Отчество" defaultValue={this.props.user.info.middleName} />
                <Input type="email" placeholder="Почта" defaultValue={this.props.user.info.email} />
                <Input type="password" placeholder="Старый пароль" />
                <Input type="password" placeholder="Новый пароль" />
                <Button value="Сохранить" />
            </form>
        );
    }
}