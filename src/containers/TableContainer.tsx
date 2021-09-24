import { connect } from 'react-redux';
import TableOfCurrency from '../components/Table/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState, ownProps: any) => ({
  tableData: store.table.tableData,
  favourite: ownProps.favourite,
});

const TableContainer = connect(mapStateToProps)(TableOfCurrency);

export default TableContainer;
