<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/22/20
 * Time: 12:21 PM
 */
namespace App\Admin\Content\Categories\Paginations;


trait GetJustDeletedPaginationTrait {
    public function getPagination(){
        $paginator = [];
        $all_count = \DB::table('categories');

            $all_count =   $all_count->where('deleted_at','!=' ,null);

        $all_count = $all_count->count();
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
