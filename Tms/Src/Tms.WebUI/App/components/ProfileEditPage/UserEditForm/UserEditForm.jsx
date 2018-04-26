import React from 'react';
import Button from '../../common/Button';
import './UserEditForm.css';

export default class UserEditForm extends React.Component {
    onEdit = e => {
        e.preventDefault();
        this.props.userActions.edit({
            id: this.props.auth.email,
            lastName: e.target.elements[0].value,
            firstName: e.target.elements[1].value,
            middleName: e.target.elements[2].value,
            email: e.target.elements[3].value
        });
    }

    render() {
        return (
            <form className="user-edit-form" onSubmit={this.onEdit}>
                <input type="text" placeholder="Фамилия" defaultValue={this.props.user.info.lastName} autoFocus />
                <input type="text" placeholder="Имя" defaultValue={this.props.user.info.firstName} />
                <input type="text" placeholder="Отчество" defaultValue={this.props.user.info.middleName} />
                <input type="email" placeholder="Почта" defaultValue={this.props.user.info.email} />
                <input type="password" placeholder="Старый пароль" />
                <input type="password" placeholder="Новый пароль" />
                <Button value="Сохранить" />
            </form>
        );
    }
}