import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import DefaultCard from './../components/default_card'

const styles = theme => ({

});

const responsive = {
    0: { items: 1 },
    // 550: { items: 2 },
    // 990: { items: 3 },
    // 1200: { items: 4 },
};

function TouchCarousel(props) {

    // console.log('sadasdasas');

    let items = [];

    if ('itens' in props) {
        items = props.itens.map((item, i) => (
            <div key={`key-${i}`} className="yours-custom-class">
                <DefaultCard data={item} handleSwitch={props.handleSwitch} openDetails={props.openDetails} />
            </div>
        ))
    }

    // items = [1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
    //     <div key={`key-${i}`} className="yours-custom-class">
    //         <DefaultCard />
    //     </div>
    // ))

    return (
        <div>
            <AliceCarousel
                infinite
                mouseDragEnabled
                dotsDisabled
                items={items}
                startIndex={0}
                responsive={responsive}
            />
        </div>
    );
}

export default withStyles(styles)(TouchCarousel);