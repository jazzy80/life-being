<?php
namespace Data;
class GuestBookEntry {
  function __construct(string $name, string $timestamp, string $text_body) {
    $this -> name = filter_var($name, FILTER_SANITIZE_STRING);
    $this -> date = $this -> get_date(
        filter_var(
          $timestamp, FILTER_SANITIZE_STRING
        )
      );
    $this -> time = $this -> get_time(
          filter_var(
            $timestamp, FILTER_SANITIZE_STRING
          )
        );
    $this -> text_body = filter_var($text_body, FILTER_SANITIZE_STRING);
  }

  private function get_date(string $timestamp): string {
    return date_format(date_create($timestamp), 'd-M-Y');
  }

  private function get_time(string $timestamp): string {
    return date_format(date_create($timestamp), 'h:m');
  }
}
