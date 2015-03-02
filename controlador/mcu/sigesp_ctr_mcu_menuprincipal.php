<?php
session_start();
if ($_POST['objetoData']) {
	$objetoData = str_replace('\\','',$_POST['objetoData']);
	$objetoData = json_decode($objetoData);	
	switch ($objetoData->operacion) {
		case 'VALIDAR_SESSION':
			if ($_SESSION['logg_fm']) {
				echo "1|{$_SESSION['rolcon']}|{$_SESSION['nomcon']}";
			}
			else {
				echo '0|';
			}
			break;
	}
}	
?>


