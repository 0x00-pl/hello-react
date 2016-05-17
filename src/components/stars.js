import React, { Component } from 'react'
import {} from './stars.css'


class Star extends Component {
    clickHandle(evt) {
        this.props.onClickStar(this.props.idx)
    }
    getValue() {
        let val = this.props.value
        if (val && 0 <= val && val <= 1) {
            return { width: (val*100)+'%' }
        } else {
            return { width: this.props.active ? '100%' : '0%' }
        }
    }
    render() {
        let cls = this.props.active ? ' active' : ''
        return (
            <span className={'stars-star ' + cls} onClick={this.clickHandle.bind(this) }>
                <span className='stars-star stars-star-cover' style={ this.getValue() }></span>
            </span>
        )
    }
}


export default class Stars extends Component {
    constructor() {
        super()
        let score = this.props && this.props.score || 0
        this.state = { stars_count: 5, stars_score: score }
    }
    clieckStarHandle(idx) {
        if (!this.props.freeze) {
            let score = (idx + 1.0) / this.state.stars_count
            this.setState({ stars_score: score })
            if (this.props.onScoreChange) {
                this.props.onScoreChange(score)
            }
        }
    }
    getStarValue(idx) {
        let score = this.props && this.props.score || this.state.stars_score
        let value_sum = score * this.state.stars_count
        if (value_sum >= idx + 1) { return 1 }
        else if (value_sum > idx) { return value_sum - idx }
        else { return 0 }
    }
    render() {
        return (
            <span className='stars'>
                {
                    Array(this.state.stars_count).fill(0).map((_, idx) => {
                        return (
                            <Star key={idx} idx={idx}
                                active={this.getStarValue(idx) == 0 ? 0 : 1}
                                value={this.getStarValue(idx) }
                                onClickStar={this.clieckStarHandle.bind(this) } >
                            </Star>
                        )
                    })
                }
            </span>
        )
    }
}