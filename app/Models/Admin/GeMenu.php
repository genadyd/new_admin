<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class GeMenu extends Model
{
    public $table = 'ge_menu';

    public function getAllSortedMenu(){
        $menu =  $this->all()->sortByDesc(['parent', 'menu_order'])->toArray();
        $new_menu = array();
        foreach ($menu as $element){
            $new_menu[$element['id']]= $element;
            $new_menu[$element['id']]['selected']=false;
            $new_menu[$element['id']]['children']=array();
//            var_dump(route($element['url']));
            if( !is_null($element['url']) && request()->fullUrl() == route($element['url'])){
                $new_menu[$element['id']]['selected'] = true;
            }
        }
        $request_array = explode('/',trim(\Request::getPathInfo(),'/'));

        foreach($new_menu as $k => $m){
            $parent_key = $m['parent'];
            if(isset($new_menu[$parent_key])){
                $new_menu[$parent_key]['children'][]=$m;
                if(isset($request_array[1]) && $request_array[1] == $new_menu[$parent_key]['name'] ){
                    $new_menu[$parent_key]['selected']= true;
                }
                unset($new_menu[$k]);
            }
        }
        return $new_menu;
    }
}
