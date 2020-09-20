import ListPagination from "./ListPagination";

class ListListeners{
    private listContainer = document.getElementById('categories_list_container')
    constructor(){
      this.pageSwitch()
    }
    pageSwitch = ():void=>{
      if(this.listContainer){
          this.listContainer.addEventListener('click',(e:any)=>{
              let targ = e.target
              if(targ){
                  if(targ.matches('a.page-link')||targ.matches('a.page-link span')){
                      if(targ.matches('a.page-link span')){
                          targ = targ.closest('a.page-link')
                      }
                      e.preventDefault()
                      const pagination = new ListPagination()
                      pagination.page(targ)
                  }
              }

          })
      }
    }
}
export default ListListeners
