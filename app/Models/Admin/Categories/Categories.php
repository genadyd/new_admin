<?php

namespace App\Models\Admin\Categories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class Categories extends Model
{
    protected $table = 'categories';

    public function categoryDataSave($category_data)
    {
        try {
            $this->parent = $category_data->parent_id;
            $this->name = htmlspecialchars($category_data->category_name);
            $this->url = htmlspecialchars($category_data->category_url);
            $this->title = htmlspecialchars($category_data->category_title);
            $this->heading = htmlspecialchars($category_data->category_heading);
            $this->description = htmlspecialchars($category_data->category_description);
            $this->save();
            return $this->id;
        } catch (QueryException $exception) {
            return $exception->errorInfo;
        }

    }
    public function getAllCategories(){
       return \DB::select(\DB::raw("SELECT *,
              (SELECT count(id) FROM categories_texts WHERE category_id = categories.id GROUP BY category_id ) AS text_field_num FROM
              categories"));
    }
    public function getCategoryByid($cat_id){
        return \DB::select(\DB::raw("SELECT *,
              (SELECT count(id) FROM categories_texts WHERE category_id = categories.id GROUP BY category_id ) AS text_field_num FROM
              categories WHERE id={$cat_id}"));
    }

    //
}
