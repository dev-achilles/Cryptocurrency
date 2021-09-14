import { connect } from 'react-redux';
import Login from '../components/Login/index';

const mapStateToProps = (store: any) => ({
  user: store.user,
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
