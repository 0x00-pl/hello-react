
import React, { Component } from 'react'
import { render } from 'react-dom'

import Stars from './components/stars.js'


class PageContent extends Component {
    constructor() {
        super()
        this.state = { score_service: undefined, score_quality: undefined, score_price: undefined }
    }
    getScoreTotal() {
        let score = [this.state.score_service, this.state.score_quality, this.state.score_price]
            .reduce((base, i) => {
                if (i) {
                    base[0] += i
                    base[1] += 1
                }
                return base
            }, [0, 0])
        
        if (score[1] == 0) {
            return 0
        }
        else {
            console.log(score)
            return score[0] / score[1]
        }
    }
    render() {
        return (
            <div className='content'>
                <div classname='score-item'>
                    <span className='score-text'>服务态度</span> <Stars onScoreChange={(s) => { this.setState({ score_service: s }) } }/>
                </div>
                <div classname='score-item'>
                    <span className='score-text'>商品质量</span> <Stars onScoreChange={(s) => { this.setState({ score_quality: s }) } }/>
                </div>
                <div classname='score-item'>
                    <span className='score-text'>商品价格</span> <Stars onScoreChange={(s) => { this.setState({ score_price: s }) } }/>
                </div>
                <div classname='score-result'>
                    <span className='score-text'>评价总计</span> <Stars freeze={true} score={ this.getScoreTotal() } />
                </div>
            </div>
        )
    }
}


render(
    <PageContent />,
    document.getElementById('main')
)