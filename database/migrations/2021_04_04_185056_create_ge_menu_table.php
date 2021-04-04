<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ge_menus', function (Blueprint $table) {
                $table->integer('id')->autoIncrement();
                $table->integer('parent')->default(0);
                $table->string('title')->unique();
                $table->text('description');
                $table->string('icon_name');
                $table->boolean('display')->default(true);
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ge_menus');
    }
}
