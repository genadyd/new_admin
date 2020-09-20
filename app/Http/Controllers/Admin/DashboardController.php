<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\BaseController;
use Illuminate\Http\Request;

class DashboardController extends BaseController
{
    protected function setCssModule()
    {
        $this->css = '/css/admin/modules/dashboard.css';
    }

    protected function setJsModule()
    {

    }

    public function show()
    {

        $data = $this->getData();
        $view = view('admin.dashboard.dashboard', $data);
        return $view;
    }

    private function getData()
    {
        $this->setCssModule();
        return array(
            'title' => 'Dashboard',
            'description' => 'this is admin main page',
            'keywoards' => 'Admin, Dachboard, crm',
            'server_ip' => $this->getIp(),
            'main_menu' => $this->getMenu(),
            'css' => $this->getIp() . $this->css
        );
    }
}
