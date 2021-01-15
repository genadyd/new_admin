<?php

namespace App\Models\Admin\Categories;

use Carbon\Carbon;
use DB;
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

    public function getAllCategories():array
    {
        $categories = DB::select('SELECT c.*,(SELECT COUNT(id) FROM categories WHERE parent = c.id ) AS children_count  FROM categories c ');
        $categories_res = [];
        $ext_fields_model = new CategoriesText();
        foreach ($categories as $cat) {
            $categories_res[$cat->id] = $cat;
            $categories_res[$cat->id]->children_show = false;
            $categories_res[$cat->id]->to_render = true;
            $categories_res[$cat->id]->text_fields = $ext_fields_model->getTextFieldsDataByCategoryId($cat->id);
        }

        return $categories_res;
    }

    public function getCategoryByid(int $cat_id):array
    {
        return DB::select(DB::raw("SELECT *,
              (SELECT count(id) FROM categories_texts WHERE category_id = categories.id GROUP BY category_id ) AS text_fields FROM
              categories WHERE id={$cat_id}"));
    }

    public function categoryDelete(array $ids): int
    {
        $now = Carbon::now();
        if(DB::table('categories')->whereIn('id', $ids)->update(array('deleted_at' => $now))){
            return 1;
        }
        return 0;

    }

    public function categoryRestore(int $id):bool
    {
        return DB::table('categories')->where('id', $id)->update(['deleted_at' => null])?1:0;
    }

//    public function getCategoryDataById(int $id)
//    {
//        return DB::table('categories')->where('id', $id)->first();
//    }

    //
}
