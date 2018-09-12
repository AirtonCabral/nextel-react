import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  
});

export class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }
    
    render() {
      const { classes } = this.props;
      return (
        <div>
            {/* {'Loading Component'} */}
            {this.props.status !== '' &&
            <div>
                {this.props.status}
            </div>}
        </div>
      )
    }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    pageLoaded: state.dom.page,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Loading))

