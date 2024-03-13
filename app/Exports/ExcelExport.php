<?php

namespace App\Exports;

use App\Exports\FormExport;
use App\Exports\SpeciesExport;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ExcelExport implements WithMultipleSheets
{
    use Exportable;

    protected $formId;

    public function __construct($formId)
    {
        $this->formId = $formId;
    }


    public function sheets(): array
    {
        $sheets = [];

        $sheets[] = new FormExport($this->formId);
        $sheets[] = new SpeciesExport($this->formId);

        return $sheets;
    }
}
