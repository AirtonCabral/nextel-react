import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import DefaultCard from './../components/default_card'

export class CardsProducts extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let classNameDynamic = "cardItem";
        let cardToShow = [];
        let totalItensToShow = 0;
        let isSmall = false;
        // hack pra resolver a questão da largura dos cards
        this.props.products.map((item, i) => {
            if (item.tags === this.props.tabTitle || this.props.tabSelected===0) {
                totalItensToShow++;
            }
        });
        if (totalItensToShow <= 2) {
            classNameDynamic = "cardItem-reduzido";
            isSmall = true;
        }
        // montando os cards gerais dos produtos
        this.props.products.map((item, i) => {
            if (item.tags === this.props.tabTitle || this.props.tabSelected===0) {
                cardToShow.push(
                    <div key={i} className={classNameDynamic}>
                        <DefaultCard
                            isSmall={isSmall}
                            id={i} />
                    </div>
                );
            }
        });
        return (
            <div className="cardContainer">
                <AliceCarousel
                    infinite
                    mouseDragEnabled
                    keysControlDisabled
                    items={cardToShow}
                    dotsDisabled={true}
                    // autoPlayInterval={4000}
                    startIndex={this.props.tabSelected}
                    responsive={{ // valores representam "acima de:"
                        0: { items: 1 },
                        620: { items: 2 },
                        1000: { items: 3 },
                        1200: { items: 4 },
                        // 0: { items: 1, buttonsDisabled: false },
                        // 720: { items: 3, buttonsDisabled: true },
                    }}
                />
            </div>
        );
    };

}

const mapStateToProps = state => ({
    products:           state.products.list,
    tabSelected:        state.products.tab_selected_index,
    tabTitle:           state.products.tab_selected_title,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsProducts)