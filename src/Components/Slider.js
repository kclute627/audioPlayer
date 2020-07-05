import React from 'react'
import PropTypes from 'prop-types'

const Slider = props => {
    return (
        <div className="slider">
            <div className="slider__bar">
                <div className="slider__played"></div>
                <div className="slider__circle"></div>
                <div className="slider__remaining"> </div>
            </div>

            
        </div>
    )
}

Slider.propTypes = {

}

export default Slider
