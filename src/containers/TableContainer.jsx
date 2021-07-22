import { connect } from 'react-redux';
import TableOfCurrency from '../components/Table/index';

const mapStateToProps = (store, ownProps) => ({
  tableData: store.table.tableData,
  favourite: ownProps.favourite,
});

const TableContainer = connect(mapStateToProps)(TableOfCurrency);

export default TableContainer;
