<?php

namespace App\Models\Admin\Categories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CategoriesText extends Model
{
    protected $table = 'categories_texts';
    public function categoryTextSave($fields_object, $cat_id){
        $id_s_arr = array();
        $data_array = array();
        foreach ($fields_object as $field) {
            $arr =[
            'category_id'=> $cat_id,
            'title'=> $field->category_text_field_title,
            'description'=> $field->text_field_description,
            'text'=> $field->ckeditor_text,
            ];
            $data_array[]=$arr;
        }

       $this->insert($data_array);
        return $id_s_arr;
    }
public function getAllTextsFields(){
    return DB::table($this->table)->orderBy('category_id')->get();
}
public function teextFieldDeleteByCatId(int $id){
        DB::table($this->table)->where('category_id',$id)->update(['deleted_at'=>Carbon::now()]);
}
public function textFieldDeletedRestore(int $id){
    DB::table($this->table)->where('category_id',$id)->update(['deleted_at'=>null]);
}
public function getTextFieldsDataByCategoryId(int $id){
   return DB::table($this->table)->where('category_id',$id)->where('deleted_at',null)->get();
}
}
