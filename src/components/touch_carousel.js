import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import DefaultCard from './../components/default_card'
import Cp from '@material-ui/core/CircularProgress';

const styles = {
    
};

const responsive = {
    0: { items: 1 },
    550: { items: 2 },
    700: { items: 3 },
    1024: { items: 3 },
};

function TouchCarousel(props) {

    let cards = [];
    let totalCards = props.itens.length;
    let userProducts = props.userProducts;

    if (totalCards === 0) {
        return(<Cp size={18} thickness={5} />)
    }
    else {
        cards = props.itens.map((dataCard, i) => {
            return (
                <div key={`key-${i}`} className="yours-custom-class">
                    <DefaultCard
                        userProducts={userProducts}
                        data={dataCard}
                        handleSwitch={props.handleSwitch}
                        openDetails={props.openDetails} />
                </div>
            )
        })
        return (
            <div>
                <AliceCarousel
                    infinite={false}
                    items={cards}
                    startIndex={0}
                    mouseDragEnabled={true}
                    buttonsDisabled={true}
                    responsive={responsive}
                />
            </div>
        );
    }
    
}

export default withStyles(styles)(TouchCarousel);