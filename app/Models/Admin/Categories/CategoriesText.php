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
public function teextFieldDeleteByCatId($id){
        DB::table($this->table)->where('category_id',$id)->update(['deleted_at'=>Carbon::now()]);
}
}
