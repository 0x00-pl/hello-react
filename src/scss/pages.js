import $ from 'jquery'
import {} from './pages.scss'

let pages_default = {
    total: 1,
    current: 0,
    container: 5,
}

// for prevent spelling mistake
let events = {
    update: 'update',
    goto_page: 'goto_page',
    update_pagelist: 'update_pagelist',
    update_content: 'update_content',
}


function update_pagelist(pagelist, make_page_icon, current, total, max_show) {
    pagelist.empty()
    if (total <= max_show) {
        // can show all icons
        for (let i = 0; i < total; i++) {
            let icon = make_page_icon(i, i + '', i == current ? 'current' : undefined)
            icon.attr('idx', i)
            pagelist.append(icon)
        }

        return pagelist
    }

    let beg = (current - (max_show / 2)) | 0
    let end = (current + (max_show / 2)) | 0
    if (beg < 0) {
        let r = 0 - beg
        beg += r
        end += r
    } else if (end >= total) {
        let r = end - total
        beg -= r
        end -= r
    }
    for (let i = beg; i < end; i++) {
        let icon_name = i
        let icon_addr = i
        if (i == beg && beg != 0) {
            icon_name = '|<'
            icon_addr = 0
        } else if (i == end - 1 && end != total) {
            icon_name = '>|'
            icon_addr = total - 1
        }
        let icon = make_page_icon(i, icon_name, i == current ? 'current' : undefined)
        icon.attr('idx', icon_addr)
        pagelist.append(icon)
    }
    return pagelist
}

function build_pagelist(show_page, make_page_icon, get_pages_length, icon_max_show) {
    let pagelist = $('<div class="pagelist"></div>')
    let current = 0
    pagelist.on(events.update, (evt) => {
        update_pagelist(pagelist, make_page_icon, current, get_pages_length(), icon_max_show)
        show_page(current)
    })
    pagelist.on(events.goto_page, (evt, p) => {
        current = Math.max(0, Math.min(get_pages_length() - 1, p))
        pagelist.trigger(events.update)
    })
    pagelist.on('click', (evt) => {
        let idx = $(evt.target).attr('idx')
        pagelist.trigger(events.goto_page, idx)
    })
    pagelist.trigger(events.update)
    return pagelist
}

function init() {
    let content = $('.pages>.content')
    function show_page(p) {
        content.text('this is page ' + p)
    }
    function make_icon(idx, text, current) {
        let ret = $('<div class="pages-icon"></div>')
        ret.text(text)
        if (current) { ret.addClass('active') }
        return ret
    }
    $('.pagelist-box').append(
        build_pagelist(show_page, make_icon, () => { return 50 }, 5))
}

document.addEventListener("DOMContentLoaded", function (event) {
    init()
})







