
export const itemFindById =(list:any, itemId:number):any=>{
    let res = 0
    for(let i = 0;i<list.length; i++){
        if(list[i].id === itemId){
            res = list[i]
           break
        }else if(list[i].children_list && list[i].children_list.length>0){
            res = itemFindById(list[i].children_list, +itemId)
        }
    }
    return res
}
export const itemsFindTree = (firstElement:any, resElementsArray:any[]=[])=>{
     resElementsArray.push(firstElement.id)
    if(firstElement.children_list && firstElement.children_list.length>0) {
        firstElement.children_list.forEach((item: any) => {
            return itemsFindTree(item, resElementsArray)
        })
    }
    return resElementsArray
}
export const findChildrenIdsList = (parentId:number, list:any[],idsResArray:any=[])=>{
    let ar:number[] = []

    idsResArray.push(+parentId)
        list.forEach((val)=>{
            if(val.parent === parentId) ar.push(val.id)
        })
    if(ar.length === 0){
        return idsResArray
    }else{
        ar.forEach((v:number)=>{
            idsResArray = findChildrenIdsList(v,list,idsResArray)

        })
    }
    return idsResArray
}
