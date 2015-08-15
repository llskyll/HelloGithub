<?php 
	//gameIdを取得する
	$gameId = $_GET['gameId'];
	//データベースのデータカウント
	$dbUrlCount = 0;
	//テーブルにURLと同じurlがあるかどうか
	$tableUrlCount = 0;
	$link = mysql_connect('localhost', 'root', '76486572');
	if (!$link) {
		//die('接続失敗です。'.mysql_error());
	}
	print('<p>接続に成功しました。</p>');

	// MySQLに対する処理
	$db_selected = mysql_select_db('gameTest', $link);
	if (!$db_selected){
		//die('データベース選択失敗です。'.mysql_error());
	}
	$sql = sprintf("SELECT clickcount FROM gameMst WHERE gameId = '%s'" ,mysql_real_escape_string($gameId));
	//すでに登録されているか検索
	$result = mysql_query($sql);
	if (!$result) {
	//	die('SELECTクエリーが失敗しました。'.mysql_error());
	}
	while ($row = mysql_fetch_assoc($result)) {
		$clickCount = $row['clickcount'];
		echo $clickCount;
	}
	$sql = sprintf("UPDATE gameMst
			 SET clickcount = %s WHERE gameId = '%s'"
			, mysql_real_escape_string($clickCount + 1)
			, mysql_real_escape_string($gameId));
	$result_flag = mysql_query($sql);
	
	if (!$result_flag) {
		//	die('UPDATEクエリーが失敗しました。'.mysql_error());
	}
	//データベースから切断
	$close_flag = mysql_close($link);
	
	if ($close_flag){
		//print('<p>切断に成功しました。</p>');
	}
	header("Location:index.php");
?>