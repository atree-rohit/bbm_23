<?php

namespace App\Exports;

use App\Exports\UserExport;
use App\Exports\UserSpeciesExport;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AllFormsExport implements WithMultipleSheets
{
    use Exportable;

    protected $email;

    public function __construct($email)
    {
        $this->email = $email;
    }


    public function sheets(): array
    {
        $sheets = [];

        $sheets[] = new UserExport($this->email);
        $sheets[] = new UserSpeciesExport($this->email);
        // dd($sheets, $this->email);
        return $sheets;
    }
}
