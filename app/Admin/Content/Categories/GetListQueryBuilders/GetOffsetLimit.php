<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/15/20
 * Time: 12:14 AM
 */


namespace App\Admin\Content\Categories\GetListQueryBuilders;


use App\Admin\Content\Categories\Paginations\GetOffsetLimitPaginationTrait;
use Illuminate\Support\Facades\DB;

class GetOffsetLimit implements GetListQueryBuilderInterface
{
    private $action;
    use GetOffsetLimitPaginationTrait;

    public function __construct(array $action = array())
    {
        $this->action = $action;
    }

    public function list()
    {
        $pagination = $this->getPagination();

        $offset = ($this->action['current_page'] - 1) * $this->action['per_page'];
        $st = DB::table('categories')
            ->where('deleted_at', null)
            ->limit($this->action['per_page'])
            ->offset($offset);
            if(isset($this->action['sort_by_date']) && $this->action['sort_by_date']){
                $st->orderBy('updated_at', 'desc');
            }
        $array['categories']= $st->get();
        $array['paginations'] = $pagination;
        return $array;

    }


}
