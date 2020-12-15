class ShipListSearch{
    public static search = (list:any, searchString:string, fields:string[])=>{
        const resList:any[] = []
        const listCopy =JSON.parse( JSON.stringify(list)); /*deep list copy*/
        const pattern = new RegExp((searchString), "g")
        listCopy.forEach((item:any)=>{
            let foundField = fields.filter((field)=>pattern.test(item[field]))
            if(foundField.length>0){
                foundField.forEach((f)=>{
                    item[f] = item[f].replace(pattern, `<span class="finded">${searchString}</span>`)
                })
                resList.push(item)
            }
        })
        return resList

    }
}
export default ShipListSearch
