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

    public function getAllCategories()
    {
        $categories = DB::select(DB::raw("SELECT *
               FROM categories ORDER BY parent DESC "));
        $categories_res = [];
        $ext_fields_nodel = new CategoriesText();
        foreach ($categories as $cat) {
            $categories_res[$cat->id] = $cat;
            $categories_res[$cat->id]->children_show = false;
            $categories_res[$cat->id]->text_fields = $ext_fields_nodel->getTextFieldsDataByCategoryId($cat->id);
        }
        foreach ($categories_res as $key => $cat_res) {
            if ($cat_res->parent != 0 && isset($categories_res[$cat_res->parent])) {
                $cat_res->to_render = true;
                $categories_res[$cat_res->parent]->children_list[] = $cat_res;
                unset($categories_res[$key]);
            }
        }

        return $categories_res;
    }

    public function getCategoryByid(int $cat_id)
    {
        return DB::select(DB::raw("SELECT *,
              (SELECT count(id) FROM categories_texts WHERE category_id = categories.id GROUP BY category_id ) AS text_field_num FROM
              categories WHERE id={$cat_id}"));
    }

    public function categoryDelete(array $ids): array
    {
        $now = Carbon::now();
        return array(
            'deleted_num'=> DB::table('categories')->whereIn('id', $ids)->update(array('deleted_at' => $now)),
            'deleted_items'=>DB::table('categories')->whereIn('id',$ids)->get(['id','deleted_at'])
        );

    }

    public function categoryRestore(int $id)
    {
        return DB::table('categories')->where('id', $id)->update(['deleted_at' => null]);
    }

    public function getCategoryDataById(int $id)
    {
        return DB::table('categories')->where('id', $id)->first();
    }

    //
}
