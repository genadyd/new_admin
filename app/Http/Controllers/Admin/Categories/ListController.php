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
use App\Models\Admin\Categories\CategoriesText;
use Illuminate\Http\Request;

class ListController extends BaseDataController
{
    private $model;
    private $text_field_model;
    public function __construct()
    {
        $this->model = new Categories();
        $this->text_field_model = new CategoriesText();
    }
/*
 * @getList --- getting all categories for init state
 * */
    public function getList()
    {
        $categories_list = $this->model->getAllCategories();
        $res_list = [];
        foreach ($categories_list as $val){
            $res_list[] =$val;
        }
        echo json_encode($res_list);
    }

   public function categoryDelete(Request $request){
       $post_data = json_decode($request->input('formData'));
       $delete_res = $this->model->categoryDelete($post_data->ids);
       /*'deleted_num'
'deleted_items'*/
       if($delete_res['deleted_num']>0){
           $this->text_field_model->textFieldDeleteByCatId($post_data->ids);
       }

       return json_encode($delete_res);
   }
   public function categoryRestore(Request $request){
       $post_data = json_decode($request->input('formData'));
       $restore_res = $this->model->categoryRestore( $post_data->id );
       if($restore_res === 1){
           $this->text_field_model->textFieldDeletedRestore($post_data->id);
       }
       return $restore_res;
   }

}
