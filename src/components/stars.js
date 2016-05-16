import React, { Component } from 'react'
import {} from './stars.css'


class Star extends Component {
    clickHandle(evt) {
        this.props.onClickStar(this.props.idx)
    }
    render() {
        let cls = 'stars-star'
        cls += this.props.active ? ' active' : ''
        return (
            <span className={cls} onClick={this.clickHandle.bind(this) }> </span>
        )
    }
}


export default class Stars extends Component {
    constructor() {
        super()
        this.state = { stars_count: 5, stars_on: 0 }
    }
    clieckStarHandle(idx) {
        this.setState({ stars_on: idx + 1 })
    }
    render() {
        console.log(this.state.stars_on)
        return (
            <span className='stars'>
                {
                    Array(this.state.stars_count).fill(0).map((_, idx) => {
                        return (
                            <Star key={idx} idx={idx} active={this.state.stars_on > idx}
                                onClickStar={this.clieckStarHandle.bind(this) }>
                            </Star>
                        )
                    })
                }
            </span>
        )
    }
}