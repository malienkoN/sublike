<?php 
    $content = '';
    foreach ($_POST as $key => $value) {
        if ($value) {
            $content .= "<b>$key</b>: <i>$value</i>\n";
        }
    }
    if (trim($content)) {
        $content = "<b>Message from Site:</b>\n".$content;
        // Your bot's token that got from @BotFather
        $apiToken = "6579960870:AAESNQY3UBrE0q9equbhnAg56KLJcNV7IA8";
        $data = [
            // The user's telegram chat id
            'chat_id' => 'testSublikeMessages',
            'text' => $content,
            'parse_mode' => 'HTML'
        ];
        $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?".http_build_query($data));
    }
?>