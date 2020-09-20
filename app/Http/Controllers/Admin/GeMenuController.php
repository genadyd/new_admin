<?php

namespace App\Http\Controllers\Admin;
use App\Models\Admin\GeMenu;


class GeMenuController
{
    private $ge_menu ;
    public function __construct()
    {
        $this->ge_model = new GeMenu();
    }
    public function getMenu(){
      return  $this->ge_model->getAllSortedMenu();
    }

}
