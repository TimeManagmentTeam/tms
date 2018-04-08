import React from 'react';
import ReactTable from 'react-table';
import EditEmployeeForm from './EditEmployeeForm.jsx';
import './EmployeeTable.css';


export default class EmployeeTable extends React.Component {
    removeEmployee = e => {
        let id = Number(e.target.getAttribute('data-id'));
        this.props.removeEmployee(id);
    }

    render() {
        return (<ReactTable
            data={this.props.employees}
            columns={[
                {
                    Header: 'ID',
                    accessor: 'id',
                    width: 48
                },
                {
                    Header: 'Фамилия',
                    accessor: 'lastName'
                },
                {
                    Header: 'Имя',
                    accessor: 'firstName'
                },
                {
                    Header: 'Отчество',
                    accessor: 'patronymic',
                    className: 'employee-table__cell'
                },
                {
                    expander: true,
                    width: 24,
                    Expander: ({ isExpanded, ...rest }) => <span className="employee-table__edit-button material-icons">edit</span>

                },
                {
                    width: 24,
                    Cell: row => (<div className="employee-table__remove-button material-icons"
                        data-id={row.original.id} onClick={this.removeEmployee}>clear</div>)
                }
            ]}
            minRows={0}
            showPagination={false}
            defaultPageSize={Number.MAX_VALUE}
            className='employee-table'
            loadingText = 'Загрузка...'
            noDataText = 'Пусто'
            loading={this.props.loading}
            SubComponent={row => (<div className="employee-table__edit-form">
                <EditEmployeeForm editEmployee={this.props.editEmployee} employee={row.original} />
            </div>)}
        />);
    }
}