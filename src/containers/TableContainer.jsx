import { connect } from 'react-redux';
import TableComponent from '../components/TableComponent/index';

const mapStateToProps = (store, ownProps) => {
  return {
    tableData: store.table.tableData,
    favourite: ownProps.favourite,
  };
};

const TableContainer = connect(mapStateToProps)(TableComponent);

export default TableContainer;
