<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstitutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('institutes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('owner_name');
            $table->string('owner_email_address')->nullable();
            $table->string('owner_mobile_number')->nullable();
            $table->text('owner_address')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->string('contact_number')->nullable();
            $table->text('address')->nullable();
            $table->text('logo_path')->nullable();
            $table->string('db_hostname')->nullable();
            $table->string('db_name')->nullable();
            $table->string('db_username')->nullable();
            $table->string('db_password')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('institutes');
        Schema::table('institutes', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
