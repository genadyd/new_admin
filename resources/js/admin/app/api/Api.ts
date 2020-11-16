abstract class Api {
   protected url:string
   protected data:any
   protected method:string
   protected type:string
    constructor(url:string, method:string = 'POST', data:any={}, type='json'){
        this.url = url
        this.data = data
        this.method = method
        this.type = type
    }

   public exeq=():object=>{

       let urlPrefix = '/new_admin/public/api'
       if(window.location.host == 'www.admin.loc' || window.location.host == '127.0.0.1:8000'|| window.location.host =='gena-admin.com'){
          urlPrefix = '/api'
       }
       const type = this.type==='json'?'application/json':'text/html'
        return fetch(urlPrefix + this.url,{
            method:this.method,
             headers:{
                 'Content-Type': type,
             },
            body:this.data =='undefined'?'':JSON.stringify(this.data)
        }).then(response => {
            if(this.type === 'json') {
             return    response.json()
            }
            return response.text()
        })
   }
}
export default Api
