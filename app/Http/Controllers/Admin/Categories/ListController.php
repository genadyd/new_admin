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

    public function getList(){
        return json_encode($this->model->getAllCategories());
   }
   public function categoryDelete(Request $request){
       $post_data = json_decode($request->input('formData'));
       $delete_res = $this->model->categoryDelete($post_data->id);
       if($delete_res[0] === 1) {
           $this->text_field_model->teextFieldDeleteByCatId($post_data->id);
       }
       return json_encode($delete_res);
   }
}
