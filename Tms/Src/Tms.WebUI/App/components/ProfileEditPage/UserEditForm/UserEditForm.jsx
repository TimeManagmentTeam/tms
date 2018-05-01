import React from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './UserEditForm.css';

export default class UserEditForm extends React.Component {
    onEdit = e => {
        e.preventDefault();
        this.props.userActions.edit({
            id: e.target.elements[0].value,
            lastName: e.target.elements[1].value,
            firstName: e.target.elements[2].value,
            middleName: e.target.elements[3].value,
            email: e.target.elements[4].value,
            oldPassHash: e.target.elements[5].value,
            passHash: e.target.elements[6].value
        });
    }

    render() {
        return (
            <form className="user-edit-form" onSubmit={this.onEdit}>
                <Input type="text" value={this.props.user.info.id} type="hidden" />
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