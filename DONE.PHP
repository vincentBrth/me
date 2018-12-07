<?php
session_start();
    echo 'Bonjour ' . $_SESSION['login'] . '!';
?>