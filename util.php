<?php
	/*
	 * 接続テスト
	 */
	function dbConTest(){
		$link = mysql_connect('localhost', 'root', '76486572');
		if (!$link) {
			die('接続失敗です。'.mysql_error());
		}
		print('<p>接続に成功しました。</p>');
		$db_selected = mysql_select_db('gameTest', $link);
		if (!$db_selected){
			die('データベース選択失敗です。'.mysql_error());
		}
		print('<p>testデータベースを選択しました。</p>');
		// MySQLに対する処理
		$close_flag = mysql_close($link);
		if ($close_flag){
			print('<p>切断に成功しました。</p>');
		}
	}
	/*
	 * gameマスタのリストを表示する。
	 */
	function getGameList(){
		$link = mysql_connect('localhost', 'root', '76486572');
		if (!$link) {
			die('接続失敗です。'.mysql_error());
		}
		$db_selected = mysql_select_db('gameTest', $link);
		if (!$db_selected){
			die('データベース選択失敗です。'.mysql_error());
		}
		mysql_set_charset('utf8');
		
		$result = mysql_query(
				'SELECT
					 gameId,
					gameName,
					gameImg,
					clickCount
				FROM 
					gameMst
				ORDER BY
				 clickCount 
				DESC
				limit 9
				');
		
		if (!$result) {
		    die('クエリーが失敗しました。'.mysql_error());
		}
		$arrayGame = array();
		
		while ($row = mysql_fetch_assoc($result)) {
			$gameMap = array('gameId' => $row['gameId'],
					'gameName' => $row['gameName'],
					'gameImg' => $row['gameImg'],
					'clickCount' => $row['clickCount']);
			array_push($arrayGame,$gameMap);
		}		

		$close_flag = mysql_close($link);
		if ($close_flag){
		}
		return $arrayGame;
		
	}
?>