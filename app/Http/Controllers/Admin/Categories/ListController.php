<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/16/20
 * Time: 2:23 PM
 */


namespace App\Http\Controllers\Admin\Categories;


use App\Admin\Content\Categories\GetListFactory;
use Illuminate\Http\Request;


class ListController
{
    private $per_page = 6;/*---items per page---*/
    private $pages_num = 3; /*---number of pages displaed in pagination---*/
    private $current_page = 1; /* curent page number*/
    private $type = 'get_offset_limit';
    public function getList(){

        $action = [
            'type'=> $this->type ,
            'current_page'=>$this->current_page,
            'per_page'=>$this->per_page,
        ];
/*
 * factory must retreeve object off GetListQueryBuilderInterface
 * in $q_class variable
 * and call method $q_class->list()
 * for getting categories list
 * and object for building pagination buttons
 *
 * */
        $list_factory = new GetListFactory($action);
        $q_class = $list_factory->getClass();
        $list_data = $q_class->list(); /* categories and pagination data  */
        $categories = $list_data['categories'] ?? []; /*categories list --array--*/
        $current_page = $list_data['paginations']['current_page'];/*curent page num --int--*/
        $last_page = $list_data['paginations']['all_pages_num'];/*last page num by all pagination buttons capasity*/

        /*
         * set num of displaed pages buttons
         * */
        $this->setPagesNum($list_data['paginations'], $this->pages_num);

        /*
         * set start button number
         * */
        $this->setStartNumber($list_data['paginations'], $this->start_page);

        /*
         * build data object for list-view
         * */
            $list_data_array = [
                'categories' => $categories,
                'current_page' => $current_page,
                'last_page'=>$last_page,
                'pages_num'=>$this->pages_num,
                'start_button_num'=>$this->start_page
            ];
        return $list_data_array;
    }
    public function getListJson(Request $request){
        $form_data = json_decode($request->input('formData'),true);
        $action = $form_data['action'];
        $this->type = $action['type'];
        $this->current_page = $action['current_page'];
        return json_encode($this->getList());
    }
    private function setPagesNum($paginations, &$pages_num){
        if($paginations['all_count'] <= $this->per_page){ /*check if all items on page*/
            $pages_num = 0;
        }
    }
    private function setStartNumber($paginations, &$start_page){
        if($paginations['current_page']>1 && $paginations['current_page']!==$paginations['all_pages_num']){
            $start_page = $paginations['current_page'] - 1;
        }elseif ($paginations['current_page']>1 && $paginations['current_page']===$paginations['all_pages_num']){
            $start_page = $paginations['current_page'] - 2;
        }elseif ($paginations['current_page']===1){
            $start_page = 1;
        }
    }
}
