<?php

namespace views\viewmodels;

class MenuItemViewModel
{
    public string $name;
    public string $url;
    public bool $is_active;
    public array $childs;

    public function __construct(string $name, string $url, bool $is_active, array $childs)
    {
        $this->name = $name;
        $this->url = $url;
        $this->is_active = $is_active;
        $this->childs = $childs;
    }
}
