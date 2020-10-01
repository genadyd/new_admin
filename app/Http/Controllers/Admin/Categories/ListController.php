<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/16/20
 * Time: 2:23 PM
 */


namespace App\Http\Controllers\Admin\Categories;



use App\Http\Controllers\Admin\BaseDataController;
use App\Models\Admin\Categories\Categories;

class ListController extends BaseDataController
{
   public function getList(){
       $model = new Categories();
       $list = json_encode($model->getAllCategories());
       return $list;
   }
}
