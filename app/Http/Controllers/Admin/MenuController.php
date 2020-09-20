<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\BaseController;
use Illuminate\Http\Request;

class MenuController extends BaseController
{


    public function show(){

        $data = $this->getData();
        $view = view('admin.content.menu.menu',$data);
        return $view;
    }
    private function getData(){
        $menu = new GeMenuController();

        return array(
            'title'=>'Menu Settings' ,
            'description'=>'this is admin Menu page',
            'keywoards'=>'Admin, Dachboard, crm',
            'server_ip'=> $this->getIp(),
            'main_menu' => $menu->getMainMenu()
        );
    }
}
