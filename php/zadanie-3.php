<?php

class RankingTable {
  private $players = [];

  public function __construct(array $players) {
    foreach ($players as $indx => $player) {
      $this->players[$player] = [ 'score' => 0, 'gamesPlayed' => 0, 'addedPlayerIndex' => $indx ];
    }
  }


  public function recordResult($name, $score) {
    if (isset($this->players[$name])) {
      $this->players[$name]['score'] += $score;
      $this->players[$name]['gamesPlayed']++;
    }
  }

  public function playerRank($n) {
    uasort($this->players, function($a, $b) {
      if ($a['score'] !== $b['score']) {
        return  $b['score'] - $a['score'];
      }

      if ($a['gamesPlayed'] === $b['gamesPlayed']) {
        return $a['addedPlayerIndex'] - $b['addedPlayerIndex'];
      }

      return $a['gamesPlayed'] - $b['gamesPlayed'];
    });

    $sortedPlayers = array_keys($this->players);
    
    return $sortedPlayers[$n - 1];
  }
}

$table = new RankingTable(array('Jan', 'Maks', 'Monika'));

$table->recordResult('Jan', 2);
$table->recordResult('Maks', 3);
$table->recordResult('Monika', 5);
echo $table->playerRank(1);
