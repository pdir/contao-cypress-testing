<?php

# Example
# php -f tools/lang-to-json.php vendor\pdir\mobilede-bundle\src\Resources\contao\languages\de\modules.php cypress\fixtures\i18n\mobilede-bundle\de\modules.json


if(!isset($argv[1]) && !isset($argv[2])) {
    return;
}

include ($argv[1]);

$res = [];

foreach ($GLOBALS['TL_LANG'] as $section=>$values) {
    foreach ($values as $key=>$val) {

        // check if val is an arary
        if (is_array($val)) {

            // check val count
            if (2 <= count($val)) {
                foreach ($val as $valKey => $value) {
                    $res[$key.'.'.$valKey] = $value?? null;
                }
                continue;
            }

            $res[$key.'.0'] = $val[0]?? null;
            $res[$key.'.1'] = $val[1]?? null;
            continue;
        }

        $res[$key] = $val?? null;
    }
}

$fixturePath = $argv[2];

if (!file_exists(dirname($fixturePath))) {
    mkdir(dirname($fixturePath), 0777, true);
}

$file = fopen($fixturePath, 'w') or die("Unable to open file!");
fwrite($file, json_encode($res));
fclose($file);
