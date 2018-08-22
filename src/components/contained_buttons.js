import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});

function ContainedButtons(props) {
  const { classes } = props;
    let value_to_print = 'default'
    if ('label' in props)
    {
      value_to_print = props.label;
    }
    return (
      <div>
        <Button variant="contained" className={classes.button}>
          {value_to_print}
        </Button>
      </div>
    );
}
  
ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ContainedButtons);