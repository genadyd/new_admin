<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class BaseController extends Controller
{
    protected $css ='';
    protected $js ='';
    abstract protected function setCssModule();
    abstract protected function setJsModule();

    protected function getIp(){
        $str = shell_exec("/sbin/ifconfig") ;
        $pattern = "/addr:(192\.168\.\d{2,3}\.\d{2,3})/";
        preg_match($pattern,$str,$matches);
        if(!isset($matches[1])) return '';
        if(str_contains(\request()->fullUrl(),$matches[1])) {
            return '/new_admin/public';
        }elseif (str_contains(\request()->fullUrl(),'localhost')){
            return '';
        }
        else{
            return '';
        }
    }
    protected function getMenu(){
        $menu = new GeMenuController();
        return $menu->getMenu();
    }
}
