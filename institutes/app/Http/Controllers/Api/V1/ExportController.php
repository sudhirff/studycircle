<?php

namespace App\Http\Controllers\Api\V1;

use App\Exports\UserExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class ExportController extends Controller
{
    private $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
    }

    public function export($filename) {
        if ($filename != null) {
            $extensionArray = explode('.', $filename);
            $extension = $extensionArray[1];
            if ($extension == "xlsx") {
                return $this->excel->download(new UserExport, $filename, Excel::XLSX);
            } 
            if ($extension == "csv") {
                return $this->excel->download(new UserExport, $filename, Excel::CSV);
            }
            if ($extension == "pdf") {
                return $this->excel->download(new UserExport, $filename, Excel::DOMPDF);
            }
            
        }
        
    }
}
