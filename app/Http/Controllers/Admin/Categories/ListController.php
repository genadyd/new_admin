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

        $texts_fields = $this->text_field_model->getAllTextsFields();
        $result_array = [];
//        dd($categories_list);
        foreach ($categories_list as $key => $val) {
            if (!isset($val->text_fields)) {
                $categories_list[$key]->text_fields = array();
            }
            foreach ($texts_fields as $tv) {
                if ($tv->category_id === $val->id) {
                    array_push($categories_list[$key]->text_fields, $tv);
                }
            }
            $categories_list[$key]->text_field_num = count($categories_list[$key]->text_fields);
            $result_array[] = $categories_list[$key];
        }

        echo json_encode($result_array);
    }

   public function categoryDelete(Request $request){
       $post_data = json_decode($request->input('formData'));
       $delete_res = $this->model->categoryDelete($post_data->id);
       if($delete_res[0] === 1) {
           $this->text_field_model->teextFieldDeleteByCatId($post_data->id);
       }
       return json_encode($delete_res);
   }
   public function categoryRestore(Request $request){
       $post_data = json_decode($request->input('formData'));
       $restore_res = $this->model->categoryRestore( $post_data->id );
       if($restore_res === 1){
           $this->text_field_model->textFieldDeletedRestore($post_data->id);
       }
       return json_encode($restore_res);
   }

}
