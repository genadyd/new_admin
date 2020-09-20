import {searchPanelOpenClose} from "./components/header";
import {getSubMenu, sidePanelMobileLoad, sidePanelOpenClose} from "./components/side_panel";

    sidePanelMobileLoad()

let listenersTargets = [
    {
        target: document.querySelector('.mobile_search_open'),
        event: 'click',
        collback: searchPanelOpenClose
    },
    {
        target:document.querySelector('.open_close_menu'),
        event:'click',
        collback: sidePanelOpenClose
    },
    {
        target:document.querySelectorAll('.menu_element'),
        event:'click',
        collback: getSubMenu
    }
]
listenersTargets.forEach(element => {
    if ((!NodeList.prototype.isPrototypeOf(element.target))) {
        element.target.addEventListener(element.event, (e) => {
            element.collback(e)
        })
    } else {
        element.target.forEach(t => {
            t.addEventListener(
                element.event, (e) => {
                    element.collback(e)
                })
        })

    }
})


