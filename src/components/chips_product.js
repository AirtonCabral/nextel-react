import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  root: {
    // backgoundColor: '#00946E !important',
  },
  deletable: {
    // backgoundColor: '#00946E !important',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 0,
    // color: '#616161',
    boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)',
  },
  label: {
    paddingLeft: 7,
    width: 110,
    // display: 'none',
    // cursor: 'inherit',
    // display: 'flex',
    // alignItems: 'center',
    // whiteSpace: 'nowrap',
    // paddingLeft: 0,
    // paddingRight: 0,
    // backgoundColor: '#00946E !important',
    // -webkit-user-select: none;
  },
  deleteIcon: {
    // display: 'block'
    // paddingLeft: 5,
  }
});


function handleClick() {
  // alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Chips(props) {
  const { classes, isDisabled, disableTitle } = props;
  return (
    <div className='chips-root'>
      <Tooltip title={props.alert} placement="top">
        <Chip
          classes={classes}
          avatar={<Avatar src={props.data.img.icon} />}
          label={disableTitle?'':props.data.produto}
          deleteIcon={isDisabled ? <div /> : null}
          onDelete={() => {
            props.onRemove(props.data);
          }}
          // className={disableTitle?'chipDesk':'chip'}
          // variant="outlined"
        />
      </Tooltip>
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
