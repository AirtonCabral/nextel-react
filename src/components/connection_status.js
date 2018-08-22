import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Cp from '@material-ui/core/CircularProgress';
import Icon from './../components/icon_model'

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textLoad: {
        marginLeft: 10,
        fontSize: 12,
        // color: 'red'
    },
};

function ConnectionStatus(props) {

    const { classes } = props;

    let colorMain = '#000'
    if (props.colors.main) {
        colorMain = props.colors.main;
    }

    let status = false
    if (props.status) {
        status = props.status;
    }

    let messages = 'Preparing to load';
    if (props.messages || props.messages !== '') {
        messages = props.messages;
    }

    return (
        <div>
            <div className={classes.root}>
                {status && <Icon size={24} name={'checked'} />}
                {!status && <Cp className={classes.progress} size={18} style={{ color: colorMain }} thickness={5} />}
                <div className={classes.textLoad}>
                    <p>{messages}</p>
                </div>

            <div style={{
                backgroundColor: '#098098',
                backgroundSize: 'cover',
                position: 'fixed',
                filter: 'opacity(.2)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }} />

            </div>
        </div>
    );
}

ConnectionStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConnectionStatus);
