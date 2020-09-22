<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/15/20
 * Time: 12:14 AM
 */


namespace App\Admin\Content\Categories\GetListQueryBuilders;


use App\Admin\Content\Categories\Paginations\GetJustDeletedPaginationTrait;

use Illuminate\Support\Facades\DB;

class GetJustDeleted implements GetListQueryBuilderInterface
{
    private $action;
    use GetJustDeletedPaginationTrait;

    public function __construct(array $action = array())
    {
        $this->action = $action;
    }

    public function list()
    {
//       dd($this->action);
        $pagination = $this->getPagination();

        $offset = ($this->action['current_page'] - 1) * $this->action['per_page'];
        $st = DB::table('categories');
            $st->where('deleted_at','!=', null);

            $st->limit($this->action['per_page'])
            ->offset($offset);
            if(isset($this->action['sort_by_date']) && $this->action['sort_by_date']){
                $st->orderBy('updated_at', 'desc');
            }
        $array['categories']= $st->get();
        $array['paginations'] = $pagination;
        return $array;

    }


}
