<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/17/20
 * Time: 1:47 AM
 */
namespace App\Admin\Content\Categories\Paginations;


trait GetOffsetLimitPaginationTrait {
    public function getPagination(){
        $paginator = [];
        $all_count = \DB::table('categories')
            ->where('deleted_at',null)
            ->count();
        $all_pages_num = (int)ceil($all_count/$this->action['per_page']);
        $curent_page = $this->action['current_page'];
        $paginator = array(
            'all_count' => $all_count,
            'all_pages_num' => $all_pages_num,
            'current_page' => $curent_page,
            'next_page' => $curent_page != $all_pages_num ? $curent_page + 1 : 0,
            'prev_page'=> $curent_page - 1
        );
        $paginator['back']=$paginator['prev_page'];
        $paginator['forward']=$paginator['next_page'];
        return $paginator;
    }
}
