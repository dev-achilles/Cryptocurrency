import { connect } from 'react-redux';
import Register from '../components/Register/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState) => ({
  register: store.register,
});

const RegisterContainer = connect(mapStateToProps)(Register);

export default RegisterContainer;
