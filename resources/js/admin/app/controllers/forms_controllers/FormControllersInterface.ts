import ListControllerInterface from "../list_controllers/ListControllerInterface";

interface FormControllersInterface{
    getRenderFunc(fn:any, context:any):void /* set rerender list func from listController */
}
export default FormControllersInterface
