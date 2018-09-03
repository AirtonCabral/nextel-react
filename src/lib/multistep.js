import React from 'react'

class MultiStep extends React.Component {
    state = {
        defaultStep: 0
    }

    nextStep = () => {
        this.setState({defaultStep: this.state.defaultStep + 1})
    }

    prevStep = () => {
        this.setState({defaultStep: this.state.defaultStep - 1})
    }

    renderComponents = () => {
        return this.props.steps.map((item, index) => {
            if(this.state.defaultStep == index)
                return <React.Fragment key={index}>{item.component}</React.Fragment>
        })
    }
    
    renderHeader = () => {
        return(
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', textAlign: 'center', padding: 20, backgroundColor: '#281c6a', height: 170}}>
                <h2 style={{color: '#fff', marginTop: 0, fontWeight: 400}}>{this.props.titleHeader}</h2>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{top: 116, position: 'absolute', height: 1, backgroundColor: '#22ebc0', width: '50%'}}></div>
                {
                    this.props.steps.map((item, index) => {
                        return(
                            <div key={index} style={{color: '#fff', zIndex: 1}}>
                                <div>{item.title}</div>
                                <div style={{width: 45, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#fff', color: '#22ebc0', borderColor: '#22ebc0', margin: '10px auto'}}>{index + 1}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
    
    render() {
        return(
            <React.Fragment>
                {this.renderHeader()}
                {this.renderComponents()}
            </React.Fragment>
        )
    }
}

export default MultiStep