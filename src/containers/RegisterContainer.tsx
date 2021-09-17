import { connect } from 'react-redux';
import Register from '../components/Register/index';

const mapStateToProps = (store: any) => ({
  register: store.register,
});

const RegisterContainer = connect(mapStateToProps)(Register);

export default RegisterContainer;
