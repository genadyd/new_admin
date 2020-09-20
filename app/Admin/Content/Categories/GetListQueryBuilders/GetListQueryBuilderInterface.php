<?php
/**
 * Created by PhpStorm.
 * User: Genady
 * Date: 9/15/20
 * Time: 12:08 AM
 */


namespace App\Admin\Content\Categories\GetListQueryBuilders;
/*
 *
 * @attr action :Array ['type':string:required,[param1:string|number],[param2:string|number],.....]
 * aviable_params:
 * 1 'get_offset_limit' - params offset:num capasity:num
 * 2 'get_offset_limit_with_deleted' - params offset:num capasity:num
 * 3 'get_offset_limit_desc - params offset:num capasity:num
 * 4 'get_offset_limit_asc_with_deleted' - params offset:num capasity:num
 * 5 'get_offset_limit_deleted' - params offset:num capasity:num
 * 6 'get_offset_limit_deleted_desc' - params offset:num capasity:num
 * 7 'get_between_dates'- params start date:date, end_date:date|null
 * 8 'get_between_dates_deleted - params start date:date, end_date
 * 9 'get_between_dates_deleted_desc - params start date:date, end_date
 *
 * @ Return Array
 * */

interface GetListQueryBuilderInterface
{
    /*
     * @builder $action:array
     * @ return laravel query condition ============
     * */
 function  list();

}
