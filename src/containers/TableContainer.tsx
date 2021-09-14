import { connect } from 'react-redux';
import TableOfCurrency from '../components/Table/index';

const mapStateToProps = (store: any, ownProps: any) => ({
  tableData: store.table.tableData,
  favourite: ownProps.favourite,
});

const TableContainer = connect(mapStateToProps)(TableOfCurrency);

export default TableContainer;
