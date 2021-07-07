import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#e0f2f1 !important',
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 600,
    marginTop: '30px',
  },
});
