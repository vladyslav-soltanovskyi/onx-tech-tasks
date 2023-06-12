<?php

class TextInput {
  private $value = '';

  public function add($text) {
    if ($this->checkIsValid($text)) {
      $this->$value .= $text;
    }
  }

  public function checkIsValid($text) {
    return true;
  }

  public function getValue() {
    return $this->$value;
  }
}

class NumericInput extends TextInput {
  public function checkIsValid($text) {
    return is_numeric($text);
  }
}

$textInput = new TextInput();
$textInput->add('1 brbrbrb ');
$textInput->add('-2');
$textInput->add('-3');
echo $textInput->getValue();

echo "<hr>";

$numericInput = new NumericInput();
$numericInput->add('adfs');
$numericInput->add('-2');
$numericInput->add('-3afsd');
$numericInput->add('231-423');
$numericInput->add('002');
echo $numericInput->getValue();
