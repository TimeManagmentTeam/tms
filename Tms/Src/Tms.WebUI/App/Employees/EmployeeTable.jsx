import React from 'react';
import ReactTable from 'react-table';
import EditEmployeeForm from './EditEmployeeForm.jsx';
import './EmployeeTable.css';


export default class EmployeeTable extends React.Component {
    removeEmployee = e => {
        this.props.removeEmployee(e.target.getAttribute('data-id'));
    }

    render() {
        return (<ReactTable
            data={this.props.employees}
            columns={[
                {
                    Header: 'ID',
                    accessor: 'id',
                    width: 60,
                    className: 'employee-table__id-cell'
                },
                {
                    Header: 'FirstName',
                    accessor: 'firstName'
                },
                {
                    Header: 'MiddleName',
                    accessor: 'middleName'
                },
                {
                    Header: 'LastName',
                    accessor: 'lastName'
                },
                {
                    Header: 'Role',
                    accessor: 'role'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Pass',
                    accessor: 'passHash'
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