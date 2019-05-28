import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/modules/getUserInfo';

const BasicLayoutHoc = WrappedComponent => {
    class Container extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        componentDidMount() {
            this.props.getUserInfo();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    const mapStateToProps = state => {
        return {
            userData: state
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            ...bindActionCreators({ getUserInfo }, dispatch)
        };
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Container);
};
export default BasicLayoutHoc;
