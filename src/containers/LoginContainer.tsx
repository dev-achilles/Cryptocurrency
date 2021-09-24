import { connect } from 'react-redux';
import Login from '../components/Login/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState) => ({
  user: store.user,
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
