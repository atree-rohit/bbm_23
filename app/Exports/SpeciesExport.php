<?php

namespace App\Exports;

use App\Models\CountSpecies;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class SpeciesExport implements FromQuery, WithHeadings, WithTitle
{

    protected $formId;

    public function __construct($formId)
    {
        $this->formId = $formId;
    }


    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        return CountSpecies::query()
            ->where('count_form_id', $this->formId)
            ->select("id", "count_form_id", "common_name", "scientific_name", "individuals", "remarks");
    }

    public function headings(): array
    {
        return ["id", "count_form_id", "common_name", "scientific_name", "individuals", "remarks"];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Species';
    }
}
