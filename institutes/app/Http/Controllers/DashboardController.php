<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function index()
    {
    	$this->layout = "app";
    	return view('dashboard');
    }
}
