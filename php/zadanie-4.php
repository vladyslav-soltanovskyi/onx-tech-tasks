<?php

class Thesaurus {
  private $words = [];

  public function __construct(array $words) {
    $this->words = $words;
  }

  public function getSynonyms($word) {
    $isExistsSynonyms = isset($this->words[$word]);
    $synonyms = $isExistsSynonyms ? $this->words[$word] : [];
    
    return json_encode([ 'word' => $word, 'synonyms' => $synonyms]);
  }
}

$table = new Thesaurus(array("market" => array("trade"), "small" => array("little", "compact")));

echo $table->getSynonyms('small');
echo '<hr>';
echo $table->getSynonyms('asleast');