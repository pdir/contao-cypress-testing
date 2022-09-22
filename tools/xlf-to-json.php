<?php

# example
# php -f tools/xlf-to-json.php contao\core-bundle\contao\languages\en\modules.xlf cypress\fixtures\i18n\contao-core\en\modules.json

if(!isset($argv[1]) && !isset($argv[2])) {
    return;
}

$path = dirname(dirname(dirname(__FILE__))) . \DIRECTORY_SEPARATOR . $argv[1];
$xml = file_get_contents($path);

// Convert xml string into an object
$new = simplexml_load_string($xml);

// Convert into json
$con = json_encode($new);

// Convert into associative array
$newArr = json_decode($con, true);

$res = [];

foreach($newArr['file']['body']['trans-unit'] as $val) {
    $res[$val['@attributes']['id']] = $val['source'];
}

$fixturePath = dirname(__FILE__, 2) . \DIRECTORY_SEPARATOR . $argv[2];

if (!file_exists(dirname($fixturePath))) {
    mkdir(dirname($fixturePath), 0777, true);
}

$file = fopen($fixturePath, 'w') or die("Unable to open file!");
fwrite($file, json_encode($res));
fclose($file);
