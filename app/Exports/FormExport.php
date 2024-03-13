<?php

namespace App\Exports;

use App\Models\CountForm;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class FormExport implements FromQuery, WithHeadings, WithTitle
{
    protected $formId;

    public function __construct($formId)
    {
        $this->formId = $formId;
    }


    public function query()
    {
        return CountForm::query()
                ->where("id", $this->formId)
                ->select("id", "name", "team_members", "location", "latitude", "longitude", "district", "state", "country", "date", "start_time", "end_time", "distance", "weather", "comments" );
    }

    public function headings(): array
    {
        return ["id", "name", "team_members", "location", "latitude", "longitude", "district", "state", "country", "date", "start_time", "end_time", "distance", "weather", "comments"];
    }

    public function title(): string
    {
        return 'Count Form';
    }
}
