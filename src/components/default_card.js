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
            color: '#4eb50c',
            '& + $colorBar': {
                backgroundColor: '#4eb50c',
            },
        },
    },
    card: {
    // maxWidth: 345,
        margin: '10px'
        },
        media: {
        height: 0,
        paddingTop: '50%', // 16:9
        },
};

class DefaultCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: true
        };
    }

    componentDidMount() {

    }

    handleChange = (event, checked) => {
        console.log(this.props.data);
        this.setState({ selected: !this.state.selected });
    }

    render() {
        const { classes } = this.props;
        const { selected } = this.state;

        return (
            <div>
            <Card className={classes.card} id='cardOriginal'>
                <CardMedia
                className={classes.media + ' midiaCard'}
                image="https://abrilvejasp.files.wordpress.com/2018/04/capa4.jpg"
                title="Contemplative Reptile"
                />
                <CardContent className='contentCard'>
                    <Typography gutterBottom variant="subheading">
                        {this.props.data.produto}
                    </Typography>
                    <Typography variant='heading'>
                        {this.props.data.tags}
                    </Typography>
                    <hr />
                    <Typography variant="caption">
                        Os melhores desenhos infantis para você e seu filho assistirem 24 horas por dia, quando e onde quiser.
                    </Typography>
                    <hr />
                    <Button className='detailsButton'
                            onClick={((e) => this.props.openDetails(e, this.props.data))}>Detalhes</Button>
                </CardContent>
                <CardActions className="cardPoints">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch onChange={this.handleChange}
                                onClick={((e) => this.props.handleSwitch(e, this.props.data))}
                                value={this.props.data}
                                checked={selected} aria-label="LoginSwitch"
                                color="Green"
                                classes={{
                                    checked: classes.colorChecked
                                }}/>
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