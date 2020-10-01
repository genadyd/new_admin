<?php

namespace App\Http\Controllers\Admin\Categories;

use App\Http\Controllers\Admin\BaseController;
use Illuminate\Http\Request;

class CategoriesController extends BaseController
{
     protected function setCssModule(){
        $this->css = '/css/admin/modules/categories.css';
    }

    protected function setJsModule(){
        $this->js = '/js/admin/modules/categories_module/index.js';
    }

    public function show(){
        $data = $this->getData();
        $view = view('admin.content.categories.categories',$data);
        return $view;
    }
    private function getJsonList(){
         $list_controller = new ListController();
         return $list_controller->getList();
    }
    private function getData(){
        $this->setCssModule();
        $this->setJsModule();
        return array(
            'title'=>'Categories Settings' ,
            'description'=>'this is admin Categories page',
            'keywoards'=>'Admin, Categories, crm',
            'server_ip'=> $this->getIp(),
            'main_menu' => $this->getMenu(),
            'css'=>$this->getIp().$this->css,
            'js'=>$this->getIp().$this->js,
//            'list'=>$this->getList(),

        );
    }
}
