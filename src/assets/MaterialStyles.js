import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#009688',
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    userSelect: 'none',
  },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
  root: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#e0f2f1 !important',
      cursor: 'pointer',
    },
  },
}))(TableRow);

export const StyledPaper = withStyles(() => ({
  root: {
    height: '150px',
  },
}))(Paper);

export const useStyles = makeStyles({
  table: {
    minWidth: 600,
    marginTop: '30px',
  },
  container: {
    overflowX: 'visible',
    marginBottom: '20px',
  },
});
