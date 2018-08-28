import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = {
    colorChecked: {
        color: 'white',
        '&$colorChecked': {
            // color: '#4eb50c',
            // '& + $colorBar': {
            //     backgroundColor: '#4eb50c',
            // },
        },
    },
    card: {
        margin: '10px'
        // maxWidth: 345,
    },
    media: {
        // height: 140,
        height: '60px',
        paddingTop: '50%', // 16:9
    },
};

class DefaultCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    componentDidMount() {
        let isSelected = false;
        this.props.userProducts.map((v, i) => {
            if (this.props.data.ID === v) {
                isSelected = true;
            }
        });

        this.setState({
            selected: isSelected
        });
    }

    handleChange = (event) => {
        this.setState({ selected: event.target.checked }, () => {
            if ('handleSwitch' in this.props) {
                this.props.handleSwitch(this.state.selected, this.props.data);
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card} id='cardOriginal'>
                    <div style={styles.canvasContainer}>
                        <CardMedia
                            className={classes.media + ' midiaCard'}
                            image={this.props.data.IMG.IMGDISPLAY}
                            title={this.props.data.produto}
                            style={styles.canvas}
                        />
                    </div>
                    <CardContent className='contentCard'>
                        <Typography gutterBottom variant="subheading">
                            {this.props.data.produto}
                        </Typography>
                        <Typography variant='body2'>
                            {this.props.data.tags}
                        </Typography>
                        <hr />
                        <Typography variant="caption">
                            {this.props.data.RESUMO}
                        </Typography>
                        <hr />
                        <Button className='detailsButton'
                            onClick={((e) => this.props.openDetails(e, this.props.data))}>Detalhes</Button>
                    </CardContent>
                    <CardActions className="cardPoints">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={this.handleChange}
                                        value='selected'
                                        checked={this.state.selected}
                                        aria-label="LoginSwitch"
                                        color="primary"
                                        classes={{
                                            checked: classes.colorChecked
                                        }}
                                    />
                                }
                            />
                        </FormGroup>
                    </CardActions>
                    <label className='points'>
                        {this.props.data.pontos} <span>pts</span>
                    </label>
                </Card>
            </div>
        )
    }

}

export default withStyles(styles)(DefaultCard);