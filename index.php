<?php

	$f = fopen("head.txt", "r");

	// Читать построчно до конца файла
	while(!feof($f)) { 
	    echo fgets($f);
	}
	fclose($f);

	
	
	$url = $_GET['m'];
	$url = explode ('/', $url);
	//print_r ($url);
	//echo ('<br>');
	//echo $url[0];
	
	switch ($url[0]) {
	case '':
		$f = fopen("remont-index.txt", "r");
		while(!feof($f)) { 
	    	echo fgets($f);
		}
		fclose($f);
    	break;
	case 'remont-televizorov':
		$f = fopen("remont-televizorov.txt", "r");
		while(!feof($f)) { 
	    	echo fgets($f);
		}
		fclose($f);
    	break;
	case 'remont-mobilnyh':
		$f = fopen("remont-mobilnyh.txt", "r");
		while(!feof($f)) { 
	    	echo fgets($f);
		}
		fclose($f);
    	break;
	case 'remont-noutbukov':
		$f = fopen("remont-noutbukov.txt", "r");
		while(!feof($f)) { 
	    	echo fgets($f);
		}
		fclose($f);
    	break;
	case 'remont-apple':
		$f = fopen("remont-apple.txt", "r");
		while(!feof($f)) { 
	    	echo fgets($f);
		}
		fclose($f);
    	break;
	case 'remont-orgtehniki':
		$f = fopen("remont-orgtehniki.txt", "r");
		while(!feof($f)) { 
	    	echo fgets($f);
		}
		fclose($f);
    	break;
	}



	$f = fopen("bottom.txt", "r");

	while(!feof($f)) { 
	    echo fgets($f);
	}
	fclose($f);




	?>