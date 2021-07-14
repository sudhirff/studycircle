<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstitutes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('institutes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('contact_number', 50)->nullable();
            $table->text('address')->nullable();
            $table->string('logo')->nullable();
            $table->tinyInteger('is_verified')->default(0);
            $table->timestamp('verification_email_sent_at')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('api_token')->unique()->nullable();
            $table->string('api_password')->nullable();
            $table->string('owner_name')->nullable();
            $table->string('owner_mobile_number')->nullable();
            $table->string('owner_mobile_number_alt')->nullable();
            $table->string('owner_email')->unique();
            $table->text('owner_address')->nullable();
            $table->string('owner_photo')->nullable();
            $table->string('owner_skype_id')->nullable();
            $table->tinyInteger('owner_is_verified')->default(0);
            $table->timestamp('owner_verification_email_sent_at')->nullable();
            $table->timestamp('owner_email_verified_at')->nullable();
            $table->string('db_host')->nullable();
            $table->string('db_name')->nullable();
            $table->string('db_username')->nullable();
            $table->string('db_password')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

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
    }
}
