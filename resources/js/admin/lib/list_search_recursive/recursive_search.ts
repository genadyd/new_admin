/*
* recursive search func
* @ params :
*   1. searchString:string
*   2. fieldsNamesList:string[] - search targets field names
*   3. list:array - search list
* @return : new list of funded elements or false
*
* */
 export const recursiveSearchFunction = (searchString:string, fieldsNamesList:string[],list:any[])=>{
         let listRes: any[] = []
          list =JSON.parse( JSON.stringify(list)); /*deep list copy*/
         const pattern = new RegExp((searchString), "g")
             list.forEach((item: any) => {
             let foundField = fieldsNamesList.filter((field)=>pattern.test(item[field]))
             if(foundField.length>0){
                 foundField.forEach((f)=>{
                     item[f] = item[f].replace(pattern, `<span class="finded">${searchString}</span>`)
                 })
                 listRes.push(item)
             }
             if(item.children_list && item.children_list.length>0){
                 listRes = [...listRes,...recursiveSearchFunction(searchString,fieldsNamesList, [...item.children_list])]
             }
  })
     return listRes
}
