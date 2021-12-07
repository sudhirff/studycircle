<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class UserExport implements 
    FromQuery, 
    Responsable, 
    ShouldAutoSize, 
    WithMapping, 
    WithHeadings, 
    WithEvents
{
    use Exportable;

    //private $fileName = "users.xlsx";
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        $users = User::query();
        //dd($users);
        return $users;
    }

    public function map($user): array 
    {
        return [
            $user->id,
            $user->name,
            $user->email,
            $user->mobile_no,
            $user->designation,
            //$user->role->name,
            $user->created_at,
        ];
    }

    public function headings(): array {
        return [
            '#',
            'Name',
            'Email',
            'Mobile',
            'Designation',
            'Created At'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getStyle('A1:F1')->applyFromArray([
                    'font'=> [
                        'bold' => true,
                    ],
                    /*'borders' => [
                        'outline' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                            'color' => ['argb' => 'FFFF0000'],
                        ],
                    ]*/
                ]);
            }
        ];
    }
}
