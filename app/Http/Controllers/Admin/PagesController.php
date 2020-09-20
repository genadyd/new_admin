<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\BaseController;
use Illuminate\Http\Request;

class PagesController extends BaseController
{


    public function show(){

        $data = $this->getData();
        $view = view('admin.content.pages.pages',$data);
        return $view;
    }
    private function getData(){
        $menu = new GeMenuController();

        return array(
            'title'=>'Pages Settings' ,
            'description'=>'this is admin main page',
            'keywoards'=>'Admin, Dachboard, crm',
            'server_ip'=> $this->getIp(),
            'main_menu' => $menu->getMainMenu()
        );
    }
}
