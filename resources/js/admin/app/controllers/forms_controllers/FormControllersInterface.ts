import ListControllerInterface from "../../Ship/Interfaces/ListControllers/ListControllerInterface";

interface FormControllersInterface{
    getRenderFunc(fn:any, context:any):void /* set rerender list func from listController */
}
export default FormControllersInterface
