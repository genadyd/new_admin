
export const sidePanelOpenClose = (event) => {
    const {sidePanel, mainMenu, subMenu} = getSidePanelComponents(),
        // back panel===================================================
        { mainMenuBack, subMenuBack} = getBackPanelComponents(),
        containersList =  subMenu.querySelectorAll('.sub_container.show');
    //====================================================================
    if (!mainMenu.classList.contains('show'))
    /** -------------main menu open ===============* */
    {
        mainMenu.classList.add('show')
        mainMenuBack.classList.add('show')
        sidePanel.classList.add('to_open')
    }
    /* * ----main menu close =========== * */
    else if (!sidePanel.classList.contains('to_open') && !subMenu.classList.contains('show')) {
        mainMenu.classList.remove('show')
        mainMenuBack.classList.remove('show')
    }
    /* * ---submenu close -------------------* */
    else if (subMenu.classList.contains('show')) {
        subMenuClose(subMenu, subMenuBack, sidePanel)
    }
    /* * ---submenu open ------------------------------ * */
    else {

      if(containersList.length>0) {
          subMenuOpen(subMenu, subMenuBack, sidePanel)
      }else{
          mainMenu.classList.remove('show')
          mainMenuBack.classList.remove('show')
      }
    }
}
export const getSubMenu = (e) => {
    const {sidePanel, mainMenu, subMenu} = getSidePanelComponents(),
        // back panel===================================================
        { mainMenuBack, subMenuBack} = getBackPanelComponents(),
        //==========================================================
        clickTarget = e.currentTarget,
        menuParentId = clickTarget.getAttribute('menu_id'),
        mainMenuElements = mainMenu.querySelectorAll('.menu_element'),
        containers = subMenu.querySelectorAll('.sub_container')
    mainMenuElements.forEach(item=>{item.classList.remove('selected')})
    clickTarget.classList.add('selected')
    containers.forEach(container => {container.classList.remove('show')})
    subMenu.querySelector('[parent_id="'+menuParentId+'"]').classList.add('show')
    subMenuOpen(subMenu, subMenuBack, sidePanel)

}
const subMenuClose = (subMenu, subMenuBack, sidePanel) => {
    subMenu.classList.remove('show')

    subMenuBack.classList.remove('show')

    sidePanel.classList.remove('to_open')
}
const subMenuOpen = (subMenu, subMenuBack, sidePanel) => {
    subMenu.classList.add('show')

    subMenuBack.classList.add('show')

    sidePanel.classList.add('to_open')
}

const getSidePanelComponents = () => {
    const obj = {
        sidePanel: document.getElementById('side_panel'),
    }
    return {
        ...obj,
        mainMenu: obj.sidePanel.querySelector('.main_menu'),
        subMenu: obj.sidePanel.querySelector('.submenu_panel')
    }
}

const getBackPanelComponents = () => {
    const backPanel = document.getElementById('side_bar_back')
    const obj = {
        mainMenuBack : backPanel.querySelector('.main_menu_back'),
        subMenuBack : backPanel.querySelector('.sub_menu_back')
    }
    return obj

}
export const sidePanelMobileLoad=()=>{
    const {sidePanel, mainMenu, subMenu} = getSidePanelComponents(),
        // back panel===================================================
        { mainMenuBack, subMenuBack} = getBackPanelComponents()

    if(screen.width < 991 ){
        subMenu.style.transitionDuration = "0s";
        mainMenu.style.transitionDuration = "0s";
        subMenu.classList.remove('show')
        mainMenu.classList.remove('show')
        mainMenuBack.classList.remove('show')
        subMenuBack.classList.remove('show')
        setTimeout(()=>{
            subMenu.style.transitionDuration = "0.5s";
            mainMenu.style.transitionDuration = "0.5s";
        },500)

    }

}


