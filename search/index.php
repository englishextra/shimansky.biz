<?php
/**
 * $shimansky.biz
 *
 * Static web site core scripts
 * @category PHP
 * @access public
 * @copyright (c) 2012 Shimansky.biz
 * @author Serguei Shimansky <serguei@shimansky.biz>
 * @license http://opensource.org/licenses/bsd-license.php
 * @package shimansky.biz
 * @link https://bitbucket.org/englishextra/shimansky.biz
 * @link https://github.com/englishextra/shimansky.biz.git
 */
$relpa = ($relpa0 = preg_replace("/[\/]+/", "/", $_SERVER['DOCUMENT_ROOT'] . '/')) ? $relpa0 : '';
$a_inc = array(
	'lib/swamper.class.php',
	'inc/regional.inc',
	'inc/vars2.inc',
	'inc/pdo_mysql.inc',
	'inc/pdo_sqlite_cache.inc'
);
foreach ($a_inc as $v) {
	require_once $relpa . $v;
}
/* this script should be utf encoded */
class Search extends Swamper {
	function __construct() {
		parent::__construct();
	}
	public function conv_symbs_to_ents($s) {
		return $s = str_replace(array(
"‘",
"‚",
"„",
"“",
"”",
"€",
"@",
"№",
"«",
"»",
/*"-",*/
"–",
"—",
"’",
"'",
"…"
), array(
"&#8216;",
"&#8218;",
"&#8222;",
"&#8220;",
"&#8221;",
"&#8364;",
"&#64;",
"&#8470;",
"&#171;",
"&#187;",
/*"&#8211;",*/
"&#8211;",
"&#8212;",
"&#39;",
"&#39;",
"&#8230;"
), $s);
	}
	public function prepare_query($s) {
		$s = trim($s);
		$s = $this->safe_str($s);
		$s = str_replace("_", " ", $s);
		$s = $this->remove_tags($s);
		$s = $this->ord_hypher($s);
		$s = $this->ord_space($s);
		return $s;
	}
	public function db_table_exists($db_handler, $table) {
		return $r = $db_handler->query("SELECT count(*) from `" . $table . "`") ? true : false;
	}
	public function write_to_caching_db2($db_handler, $table, $marker, $q, $p) {
		if ($this->db_table_exists($db_handler, $table)) {
			$db_handler->exec("DELETE FROM " . $table . " WHERE `query`='" . $this->conv_symbs_to_ents($q) . "';");
			$SQL = "INSERT INTO `" . $table . "` ";
			$SQL .= "VALUES(null, :adddate, :query, :content);";
			$STH = $db_handler->prepare($SQL);
			$STH->bindValue(":adddate", $marker);
			$STH->bindValue(":query", $this->conv_symbs_to_ents($q));
			$STH->bindValue(":content", $this->conv_symbs_to_ents($p));
			$STH->execute();
		}
	}
}
if (!isset($Search) || empty($Search)) {
	$Search = new Search ();
}
$query = $Search->get_post('q') ? $Search->get_post('q') : ($Search->get_post('s') ? $Search->get_post('s') : '');
if (!$query) {$query = $Search->get_post('term') ? $Search->get_post('term') : ($Search->get_post('search') ? $Search->get_post('search') : '');}
if (!$query) {$query = $Search->get_post('query') ? $Search->get_post('query') : '';}
$query = $Search->prepare_query($query);
$length = $Search->get_post('length');
if (!$length) {
	$length = 255;
}
$limit = $Search->get_post('limit');
if (!$limit) {
	$limit = 4;
}
$ignore_length = 2;
$query_length = ($query_length0 = mb_strlen($query, mb_detect_encoding($query, "UTF-8, ASCII"))) ? $query_length0 : 0;
$table_name = $pt_pages_table_name;
$table_name1 = $options_more_movies_3gp_ipod_psp_table_name;
$table_name2 = $pt_search_history_table_name;
$table_name3 = $dict_enru_general_table_name;
$table_name4 = $dict_ruen_general_table_name;
$table_name5 = $options_downloads_table_name;
$r = '';
$p = '';
if (!empty($query) && $query_length > $ignore_length) {
	/* read from cache */
	$from_cache = '';
	$cache_table_name = 'cache_search';
	$SQLITE_CACHE->exec("CREATE TABLE IF NOT EXISTS `" . $cache_table_name . "` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `adddate` INTEGER NOT NULL, `query` TEXT, `content` TEXT )");
	if ($Search->db_table_exists($SQLITE_CACHE, $cache_table_name)) {
		$SQL = "SELECT `id`, `adddate`, `query`, `content` ";
		$SQL .= "FROM `" . $cache_table_name . "` ";
		$SQL .= " WHERE `id`!='' AND `adddate`!='' AND `query`!='' AND `content`!='' AND `query`=:query LIMIT :limit;";
		$STH = $SQLITE_CACHE->prepare($SQL);
		$a = null;
		/**
		 * if-not-true-then-false.com/2012/php-pdo-sqlite3-example/
		 * php.net/manual/en/sqlite3stmt.bindvalue.php
		 */
		$a[] = array(":query", $Search->conv_symbs_to_ents($query));
		$a[] = array(":limit", (int) 1);
		for ($i = 0; $i < count($a); $i++) {
			if (!empty($a[$i][0])) {
				$STH->bindValue($a[$i][0], $a[$i][1]);
			}
		}
		$STH->execute();
		while ($fr = $STH->fetch(PDO::FETCH_NUM)) {
			if ($fr[0]) {
				$r = 1;
				if ($fr[1] > $vars2_start_time && $fr[1] < $vars2_end_time) {
					$from_cache = 1;
				}
				$p = "\n\n" . "<!-- from " . $cache_table_name . " -->" . "\n\n" . $fr[3];
			}
		}
	}
	if (!$r) {
		try {
			/* $p = '<h2>&#1056;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090;&#1099; &#1087;&#1086;&#1080;&#1089;&#1082;&#1072;</h2>' . "\n" . '<ol>' . "\n"; */
			/* $p = '<h2>&#1056;&#1077;&#1079;&#1091;&#1083;&#1100;&#1090;&#1072;&#1090;&#1099; &#1087;&#1086;&#1080;&#1089;&#1082;&#1072;</h2>' . "\n"; */
			$p .= '<ol class="jqm-list">' . "\n";
			if ($Search->db_table_exists($DBH, $table_name)) {
				$SQL = "SELECT `id`, `page_title`, `page_url`, `description`, `wordhash` ";
				$SQL .= "FROM `" . $table_name . "` ";
				$SQL .= " WHERE `page_title`!='' AND `page_url`!='' AND `description`!='' AND `wordhash`!='' AND `page_title` LIKE :query OR `description` LIKE :query OR `wordhash` LIKE :query ORDER BY `page_title` ASC LIMIT :limit;";
				$STH = $DBH->prepare($SQL);
				$a = null;
				/**
				 * php.net/manual/en/pdostatement.bindparam.php
				 * The CORRECT solution is to leave clean the placeholder like this:
				 * "SELECT * FROM `users` WHERE `firstname` LIKE :keyword";
				 * And then add the percentages to the php variable where you store the keyword:
				 * $keyword = "%".$keyword."%";
				 */
				$a[] = array(":query", '%' . $Search->conv_symbs_to_ents($query) . '%', PDO::PARAM_STR);
				$a[] = array(":limit", (int) $limit, PDO::PARAM_INT);
				for ($i = 0; $i < count($a); $i++) {
					if (!empty($a[$i][0])) {
						$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
					}
				}
				$STH->execute();
				if ($STH->rowCount() > 0) {
					$r = 1;
					while ($fr = $STH->fetch(PDO::FETCH_NUM)) {
						$p .= '<li><a href="' . $Search->ensure_amp($fr[2]) . '" class="ui-link" data-ajax="false">' . $Search->safe_html($fr[3], 65) . '</a></li>' . "\n";
					}
				}
			}
			if ($Search->db_table_exists($DBH, $table_name1)) {
				$SQL = "SELECT `id`, `value`, `text` ";
				$SQL .= "FROM `" . $table_name1 . "` ";
				$SQL .= " WHERE `value`!='' AND `text`!='' AND `text` LIKE :query ORDER BY `text` ASC LIMIT :limit;";
				$STH = $DBH->prepare($SQL);
				$a = null;
				/**
				 * php.net/manual/en/pdostatement.bindparam.php
				 * The CORRECT solution is to leave clean the placeholder like this:
				 * "SELECT * FROM `users` WHERE `firstname` LIKE :keyword";
				 * And then add the percentages to the php variable where you store the keyword:
				 * $keyword = "%".$keyword."%";
				 */
				$a[] = array(":query", '%' . $Search->conv_symbs_to_ents($query) . '%', PDO::PARAM_STR);
				$a[] = array(":limit", (int) $limit, PDO::PARAM_INT);
				for ($i = 0; $i < count($a); $i++) {
					if (!empty($a[$i][0])) {
						$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
					}
				}
				$STH->execute();
				if ($STH->rowCount() > 0) {
					$r = 1;
					while ($fr = $STH->fetch(PDO::FETCH_NUM)) {
						$p .= '<li><a href="' . $Search->ensure_amp($fr[1]) . '" class="ui-link" data-ajax="false">' . $Search->safe_html($fr[2], 65) . '</a></li>' . "\n";
					}
				}
			}
			if ($Search->db_table_exists($DBH, $table_name5)) {
				$SQL = "SELECT `id`, `value`, `text` ";
				$SQL .= "FROM `" . $table_name5 . "` ";
				$SQL .= " WHERE `value`!='' AND `text`!='' AND `text` LIKE :query ORDER BY `text` ASC LIMIT :limit;";
				$STH = $DBH->prepare($SQL);
				$a = null;
				/**
				 * php.net/manual/en/pdostatement.bindparam.php
				 * The CORRECT solution is to leave clean the placeholder like this:
				 * "SELECT * FROM `users` WHERE `firstname` LIKE :keyword";
				 * And then add the percentages to the php variable where you store the keyword:
				 * $keyword = "%".$keyword."%";
				 */
				$a[] = array(":query", '%' . $Search->conv_symbs_to_ents($query) . '%', PDO::PARAM_STR);
				$a[] = array(":limit", (int) $limit, PDO::PARAM_INT);
				for ($i = 0; $i < count($a); $i++) {
					if (!empty($a[$i][0])) {
						$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
					}
				}
				$STH->execute();
				if ($STH->rowCount() > 0) {
					$r = 1;
					while ($fr = $STH->fetch(PDO::FETCH_NUM)) {
						$p .= '<li><a href="' . $Search->ensure_amp($fr[1]) . '" class="ui-link" data-ajax="false">' . $Search->safe_html($fr[2], 65) . '</a></li>' . "\n";
					}
				}
			}
			if ($Search->db_table_exists($DBH, $table_name3)) {
				$SQL = "SELECT `id`, `entry`, `description` ";
				$SQL .= "FROM `" . $table_name3 . "` ";
				$SQL .= " WHERE `entry`!='' AND `description`!='' AND `entry` LIKE :query ORDER BY `entry` ASC LIMIT :limit;";
				$STH = $DBH->prepare($SQL);
				$a = null;
				/**
				 * php.net/manual/en/pdostatement.bindparam.php
				 * The CORRECT solution is to leave clean the placeholder like this:
				 * "SELECT * FROM `users` WHERE `firstname` LIKE :keyword";
				 * And then add the percentages to the php variable where you store the keyword:
				 * $keyword = "%".$keyword."%";
				 */
				$a[] = array(":query", $Search->conv_symbs_to_ents($query) . '%', PDO::PARAM_STR);
				$a[] = array(":limit", (int) $limit, PDO::PARAM_INT);
				for ($i = 0; $i < count($a); $i++) {
					if (!empty($a[$i][0])) {
						$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
					}
				}
				$STH->execute();
				if ($STH->rowCount() > 0) {
					$r = 1;
					while ($fr = $STH->fetch(PDO::FETCH_NUM)) {
						$p .= '<li>' . $Search->safe_html($fr[1], 28) . '&#160;&#8212; ' . $Search->safe_html($fr[2], 28) . '</li>' . "\n";
					}
				}
			}
			if ($Search->db_table_exists($DBH, $table_name4)) {
				$SQL = "SELECT `id`, `entry`, `description` ";
				$SQL .= "FROM `" . $table_name4 . "` ";
				$SQL .= " WHERE `entry`!='' AND `description`!='' AND `entry` LIKE :query ORDER BY `entry` ASC LIMIT :limit;";
				$STH = $DBH->prepare($SQL);
				$a = null;
				/**
				 * php.net/manual/en/pdostatement.bindparam.php
				 * The CORRECT solution is to leave clean the placeholder like this:
				 * "SELECT * FROM `users` WHERE `firstname` LIKE :keyword";
				 * And then add the percentages to the php variable where you store the keyword:
				 * $keyword = "%".$keyword."%";
				 */
				$a[] = array(":query", $Search->conv_symbs_to_ents($query) . '%', PDO::PARAM_STR);
				$a[] = array(":limit", (int) $limit, PDO::PARAM_INT);
				for ($i = 0; $i < count($a); $i++) {
					if (!empty($a[$i][0])) {
						$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
					}
				}
				$STH->execute();
				if ($STH->rowCount() > 0) {
					$r = 1;
					while ($fr = $STH->fetch(PDO::FETCH_NUM)) {
						$p .= '<li>' . $Search->safe_html($fr[1], 28) . '&#160;&#8212; ' . $Search->safe_html($fr[2], 28) . '</li>' . "\n";
					}
				}
			}
			$p .= '</ol>' . "\n";
			/* write search history */
			if ($Search->db_table_exists($DBH, $table_name2)) {
				if (mb_strlen($query, mb_detect_encoding($query)) > $ignore_length) {
					$SQL = "DELETE FROM `" . $table_name2 . "` ";
					$SQL .= "WHERE `query`=:query;";
					$STH = $DBH->prepare($SQL);
					$a = null;
					/**
					 * php.net/manual/en/pdostatement.bindparam.php
					 * The CORRECT solution is to leave clean the placeholder like this:
					 * "SELECT * FROM `users` WHERE `firstname` LIKE :keyword";
					 * And then add the percentages to the php variable where you store the keyword:
					 * $keyword = "%".$keyword."%";
					 */
					$a[] = array(":query", $Search->conv_symbs_to_ents($query), PDO::PARAM_STR);
					for ($i = 0; $i < count($a); $i++) {
						if (!empty($a[$i][0])) {
							$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
						}
					}
					$STH->execute();
					/* switching the value to 0 workes for AUTO_INCREMENT field */
					$SQL = "INSERT INTO `" . $table_name2 . "` ";
					$SQL .= "(`id`,`adddate`,`query`,`host`,`ip`) ";
					$SQL .= "VALUES (0, :adddate, :query, :host, :ip);";
					$STH = $DBH->prepare($SQL);
					$a = null;
					$a[] = array(":adddate", (int) $vars2_marker, PDO::PARAM_INT);
					$a[] = array(":query", $Search->conv_symbs_to_ents($query), PDO::PARAM_STR);
					$a[] = array(":host", $Search->ensure_amp($vars2_http_x_forwarded_for), PDO::PARAM_STR);
					$a[] = array(":ip", $Search->ensure_amp($vars2_remote_address), PDO::PARAM_STR);
					for ($i = 0; $i < count($a); $i++) {
						if (!empty($a[$i][0])) {
							$STH->bindValue($a[$i][0], $a[$i][1], $a[$i][2]);
						}
					}
					$STH->execute();
				}
			}
			if (!empty($r)) {
				if (!$from_cache) {
					$Search->write_to_caching_db2($SQLITE_CACHE, $cache_table_name, $vars2_marker, $query, $p);
				}
			}
			$DBH = null;
		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}
}
$SQLITE_CACHE = null;
?><!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex,nofollow" />
		<title>Поиск</title>
		<style>
			body {
				font-family: "Roboto";
				color: transparent;
				background-color: #F0F0F0;
			}
			body,
			a {
				color: transparent;
			}
			template,
			img,
			svg,
			canvas {
				display: none;
			}
			html,
			body {
				height: 100%;
			}
			html {
				font-size: 15px;
				line-height: 20px;
			}
			body {
				font-size: 1.000rem;
				line-height: 1.333rem;
				margin: 0;
			}
			.container {
				visibility: hidden;
				opacity: 0;
			}
			@media only screen {
				html {
					font-size: 12px;
				}
			}
			@media only screen and (max-width:40em) {
				html {
					font-size: 12px;
				}
			}
			@media only screen and (min-width:40.063em) {
				html {
					font-size: 12px;
				}
			}
			@media only screen and (min-width:40.063em) and (max-width:64em) {
				html {
					font-size: 15px;
				}
			}
			@media only screen and (min-width:64.063em) {
				html {
					font-size: 15px;
				}
			}
			@media only screen and (min-width:64.063em) and (max-width:90em) {
				html {
					font-size: 15px;
				}
			}
			@media only screen and (min-width:90.063em) {
				html {
					font-size: 15px;
				}
			}
			@media only screen and (min-width:90.063em) and (max-width:120em) {
				html {
					font-size: 18px;
				}
			}
			@media only screen and (min-width:120.063em) {
				html {
					font-size: 18px;
				}
			}
		</style>
		<noscript>
			<link rel="stylesheet" href="../libs/search/css/bundle.min.css" />
			<style>
				.container {
					visibility: visible;
					opacity: 1;
				}
			</style>
		</noscript>
	</head>
	<body>
		<div class="page" id="page" role="document">
			<div class="panel-nav-top"></div>
			<div class="container" id="container" role="main">
				<div class="content-wrapper">
					<div class="grid-narrow grid-pad">
						<div class="col col-1-1">
							<div class="content">
								<h1>Поиск</h1>
							</div>
						</div>
					</div>
					<div class="grid-narrow grid-pad">
						<div class="col col-1-1">
							<div class="content">
								<h2>Ваш запрос</h2>
								<div>
									<form method="post" action="/search/" id="search_form" class="search_form" enctype="application/x-www-form-urlencoded">
										<p>
											<label for="text">Введите одно ключевое слово:</label>
											<input type="text" name="q" id="text" autocomplete="off" placeholder="Найти" aria-label="Keywords / Ключевые слова" />
										</p>
										<p class="textcenter">
											<input class="btn btn-default" id="search_form_reset_button" value="Очистить" type="reset" aria-label="Reset / Очистить" /><input class="btn btn-primary" id="search_form_submit_button" value="Отправить" type="submit" aria-label="Submit / Отправить" />
										</p>
									</form>
								</div>
								<div class="hr"></div>
								<?php
									if (!empty($query)) {
										if (!empty($r)) {
											echo '<div class="module module-clean">
													<div class="module-header">
														<h2>Результат</h2>
													</div>
													<div id="search_results" class="module-content">' . $p . '</div>
												</div>' . "\n";
										} else {
											echo '<div class="module module-clean">
													<div class="module-header">
														<h2>Результат</h2>
													</div>
													<div id="search_results" class="module-content">
														<p>Ничего не&#160;найдено. Однако Ваши запросы фиксируются и&#160;учитываются редактором. Некоторые страницы удаляются по причине недостаточного качества или сомнительного с&#160;точки зрения авторских прав контента. Стоит так&#160;же уточнить, что ресурс некоммерческий и&#160;неразвлекательный</p>
													</div>
												</div>' . "\n";
										}
									} else {
										echo '<div class="module module-clean">
												<div class="module-header">
													<h2>Результат</h2>
												</div>
												<div id="search_results" class="module-content">
													<p>Введите ключевое слово в поле поиска&#160;/ Type your keyword in the search box</p>
												</div>
											</div>' . "\n";
									}
								?>				
							</div>
						</div>
					</div>
					<div class="grid-narrow grid-pad">
						<div class="col col-1-1">
							<div class="footer">
								<p class="copyright"><a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank">Content licensed under&#160;CC&#160;BY-ND&#160;4.0.</a>&#160;
						<a href="javascript:void(0);" onclick="var a='mailto',b=':',c='englishextra2',k='&#64;',q='yahoo',s='.',v='com';this.href=a+b+c+k+q+s+v;">&#169;&#160;2006&#8212;2017&#160;englishextra.</a>&#160;
						<a href="../pages/webdev/webdev_about.html">О сайте</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul id="panel-nav-menu" class="panel-nav-menu">
				<li><a href="../contents.html">Содержание</a></li>
				<li><a href="../pages/articles/articles_reading_rules_utf.html">Правила чтения</a></li>
				<li><a href="../pages/grammar/grammar_usage_of_articles_a_the.html">Артикли a&#160;/ an и&#160;the</a></li>
				<li><a href="../pages/grammar/grammar_usage_of_tenses.html">Употребление времен</a></li>
				<li><a href="../pages/grammar/grammar_phrasal_verbs.html">Фразовые глаголы</a></li>
				<li><a href="../pages/aids/aids_topics.html">Топики на&#160;английском</a></li>
				<li><a href="../pages/tests/tests_grammar_tests_with_answers.html">Тесты по&#160;грамматике</a></li>
				<li><a href="../pages/tests/tests_gia_ege_letter_sample.html">ГИА&#160;/ ЕГЭ: Задания&#160;33, 39, 40</a></li>
				<li><a href="../pages/tests/tests_ege_essay_sample.html">ЕГЭ: Задание&#160;40</a></li>
				<li><a href="../sitemap.html">Карта сайта</a></li>
			</ul>
			<a href="../contents.html" class="btn-nav-menu" id="btn-nav-menu" onclick="return false;" title="Содержание"></a>
		</div>
		<script src="../libs/search/js/bundle.min.js" type="application/javascript" async=""></script>
	</body>
</html>
