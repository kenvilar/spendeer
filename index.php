<?php
/* Spendeer - A Very Simple Budget Application */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="//fonts.googleapis.com/css?family=Open+Sans:100,300,400,600" rel="stylesheet" type="text/css">
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="style.css" rel="stylesheet" type="text/css">
    <title>Spendeer - A Very Simple Budget Application</title>
</head>
<body>

<div class="wrapper">

    <div class="top">
        <div class="spendeer">
            <div class="spendeer_title">
                Available Budget in <span class="spendeer_title--month">December 2017</span>:
            </div>

            <div class="spendeer_value">- 0.00</div>

            <div class="spendeer_income clearfix">
                <div class="spendeer_income--text">Income</div>
                <div class="right">
                    <div class="spendeer_income--value">+ 0.00</div>
                    <div class="spendeer_income--percentage">&nbsp;</div>
                </div>
            </div>

            <div class="spendeer_expenses clearfix">
                <div class="spendeer_expenses--text">Expenses</div>
                <div class="right clearfix">
                    <div class="spendeer_expenses--value">- 0.00</div>
                    <div class="spendeer_expenses--percentage">---</div>
                </div>
            </div>
        </div>
    </div>

</div>

<label for="">
    <select name="item_type" class="item_type">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>
</label>

<label>
    <input type="text" name="" class="item_description" placeholder="">
</label>

<label>
    <input type="number" name="" class="item_value" placeholder="">
</label>

<button class="add_button">Add</button>

<script src="main.js"></script>
</body>
</html>
