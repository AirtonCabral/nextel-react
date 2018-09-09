import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  avatar: {
    width: 40,
    height: 40,
    marginRight: 0,
    // color: '#616161',
    boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)',
  },
  label: {
    // display: 'none',
    // cursor: inherit;
    // display: flex;
    // align-items: center;
    // white-space: nowrap;
    // padding-left: 12px;
    // padding-right: 12px;
    // -webkit-user-select: none;
  },
  deleteIcon: {
    // display: 'none'
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
          label={disableTitle?null:props.data.produto}
          // deleteIcon={isDisabled ? <div /> : null}
          // onDelete={() => {
          //   props.onRemove(props.data);
          // }}
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
