<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->date('bookDate');
            $table->string('bookTime');
            $table->unsignedBigInteger('serviceID');
            $table->string('name');
            $table->string('email');
            $table->bigInteger('contact');
            $table->string('countryCode');
            $table->bigInteger('zoomMeetingID');
            $table->string('googleEventID');
            $table->json('metadata');
            $table->timestamps();

            $table->foreign('serviceID')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('bookings');
    }
};
