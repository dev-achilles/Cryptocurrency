import { connect } from 'react-redux';
import Login from '../components/Login/index';

const mapStateToProps = (store) => ({
  user: store.user,
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
