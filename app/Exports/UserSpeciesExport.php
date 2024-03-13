<?php

namespace App\Exports;

use App\Models\CountSpecies;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class UserSpeciesExport implements FromQuery, WithHeadings, WithTitle
{

    protected $email;

    public function __construct($email)
    {
        $this->email = $email;
    }


    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        $email = $this->email;
        return CountSpecies::query()
            ->whereHas('count_form', function ($query) use ($email) {
                $query->where('email', $email);
            })
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
