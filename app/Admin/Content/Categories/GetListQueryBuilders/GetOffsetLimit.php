<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/15/20
 * Time: 12:14 AM
 */


namespace App\Admin\Content\Categories\GetListQueryBuilders;




use App\Admin\Content\Categories\Paginations\GetOffsetLimitPaginationTrait;

class GetOffsetLimit implements GetListQueryBuilderInterface
{
    private $action;
    use GetOffsetLimitPaginationTrait;
    public function __construct(array $action=array())
    {
        $this->action = $action;

    }
    public function list()
    {

        $pagination = $this->getPagination();

      $offset = ($this->action['current_page']-1)*$this->action['per_page'];
       $array['categories'] = \DB::table('categories')
            ->where('deleted_at',null)
            ->limit($this->action['per_page'])
            ->offset($offset)->get();
       $array['paginations'] = $pagination;
       return $array;

    }


}
