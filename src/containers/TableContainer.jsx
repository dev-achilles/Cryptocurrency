import { connect } from 'react-redux';
import TableComponent from '../components/TableComponent/index';

const mapStateToProps = (store) => {
  return {
    tableData: store.table.tableData,
  };
};

const TableContainer = connect(mapStateToProps)(TableComponent);

export default TableContainer;
