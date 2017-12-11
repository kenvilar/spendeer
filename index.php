<?php
/* Spendeer - A Very Simple Budget Application */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="//fonts.googleapis.com/css?family=Open+Sans:100,300,400,600" rel="stylesheet" type="text/css">
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/style.min.css" rel="stylesheet" type="text/css">
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
    </div> <!--.top-->

    <div class="bottom">

        <div class="add_wrapper">
            <div class="add_container">
                <label for="item_type">
                    <select id="item_type" name="item_type" class="item_type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </label>
                <label for="item_description">
                    <input type="text" name="" class="item_description" id="item_description"
                           placeholder="Add Description">
                </label>
                <label for="item_value">
                    <input type="number" name="item_value" id="item_value" class="item_value" placeholder="Value">
                </label>
                <button class="add_button"><i class="ion-ios-checkmark-outline"></i></button>
            </div>
        </div>

        <div class="container clearfix">
            <div class="list_of_incomes_container">
                <h2 class="income_title">Income</h2>
                <div class="income_list">
                    <!--List of Incomes-->
                </div>
            </div>
            <div class="list_of_expenses_container">
                <h2 class="expenses_title">Expenses</h2>
                <div class="expenses_list">
                    <!--List of Expenses-->
                </div>
            </div>
        </div>

    </div> <!--.bottom-->

</div>


<script src="assets/js/main.js"></script>
</body>
</html>
