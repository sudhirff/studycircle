<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class EntityMultiSheetExport implements FromCollection, WithMultipleSheets
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        //
    }

    public function sheets(): array
    {
        $sheet = [];
        return $sheet;
    }
}
