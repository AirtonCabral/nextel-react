import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({

// });

// function SimpleComponent(props) {
//     return (
//         <div>
//             Yesh
//         </div>
//     );
// }

// export default withStyles(styles)(SimpleComponent);




export default class SimpleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div />
        )
    }
    
}
