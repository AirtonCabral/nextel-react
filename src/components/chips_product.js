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
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {

  },
});


function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Chips(props) {
  const { classes, isDisabled } = props;
  return (
    <div className={classes.root}>
      <Tooltip title={props.alert} placement="top">
        <Chip
          avatar={<Avatar src={props.data.img.icon} />}
          label={props.data.produto}
          deleteIcon={isDisabled ? <div /> : null}
          onDelete={() => {
            props.onRemove(props.data);
          }}
          className={classes.chip}
        />
      </Tooltip>
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
