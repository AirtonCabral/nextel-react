import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import './../sass/listFirstModal.scss';

const styles = theme => ({
root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
},
});

class CheckboxListSecondary extends React.Component {
state = {
    checked: [1,2],
};

handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    this.setState({
        checked: newChecked,
    });
};

render() {
    const { classes } = this.props;

    return (
    <div className='containerList'>
        <List>
        {[0, 1, 2, 3,4,5,6,7,8,9].map(value => (
            <ListItem key={value} dense button className='Itemlist'>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/100" />
                <ListItemText primary={`Line item ${value + 1}`} secondary={'tipo de produto'} />
                <div item className="pointsService">
                    <label><span>3</span>pts</label>
                </div>
            </ListItem>
        ))}
        </List>
    </div>
    );
}
}

CheckboxListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);