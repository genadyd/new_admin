<?php

namespace App\Http\Controllers\Admin\Categories;
use App\Admin\Content\Categories\CategoriesList;
use App\Http\Controllers\Admin\BaseDataController;
use App\Models\Admin\Categories\Categories;
use App\Models\Admin\Categories\CategoriesText;
use Illuminate\Http\Request;

class FormController extends BaseDataController
{
    private $model, $text_fields_model;
    public function __construct()
    {
        $this->model = new Categories();
        $this->text_fields_model = new CategoriesText();
    }


    public function getData(Request $request){
       $post_data = json_decode($request->input('formData'));
       $category_data = $post_data->categoryDataObject;
       $post_fields_data = $post_data->textFieldsObject;
       $cat_id = $this->saveCategoryData($category_data);
       $this->saveCategoryTextField($post_fields_data, $cat_id);
       $new_category_data =  $this->model->getCategoryByid($cat_id)[0] ;
       echo json_encode(array('category'=>$new_category_data, 'success'=>1));
   }
   private function saveCategoryData($category_data){
       return $this->model->categoryDataSave($category_data);
   }
   private function saveCategoryTextField($fields_object, $cat_id){
       return $this->text_fields_model->categoryTextSave($fields_object, $cat_id);
   }

}
