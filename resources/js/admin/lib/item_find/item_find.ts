export const itemFindFunc =(list:any, itemId:number)=>{
    let res = 0
    list.forEach((val:any)=>{
        if(val.id === itemId){
            res = val
            return res
        }
        if(val.children_list && val.children_list.length>0){
           return  itemFindFunc(val.children_list, itemId)
        }
    })
    return res
}
