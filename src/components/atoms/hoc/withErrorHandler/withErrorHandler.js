import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        // need will mount otherwise if didMount err will never catch
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({error: null});
                // req has to be returned, giving axios back controll whenever // used same as res
                return req;
            })
            // the res => res is returning the res obj back to axios for 
            this.resInterceptor = axios.interceptors.response.use(res => res, (err) => {
                this.setState({error: err});
            })
        }

        // since HOC will be used wrapped around more than one component 
        // willMount code will run every time its used so we unMount
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            )
        }
    }
}

export default withErrorHandler;