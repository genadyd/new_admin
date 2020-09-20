export const searchPanelOpenClose =(e)=>{
  const searchBox = document.querySelector('.mobile_search_box')
    if(e.target.classList.contains('active')){
        searchBox.classList.remove('oppened')
        e.target.classList.remove('active')
        e.target.closest('#main_navbar').classList.remove('search_open');
    }else {
        searchBox.classList.add('oppened')
        e.target.classList.add('active')
        e.target.closest('#main_navbar').classList.add('search_open');
    }
}
