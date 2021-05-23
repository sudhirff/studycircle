<!DOCTYPE html>

<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>" class="light">
    <!-- BEGIN: Head -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <link href="<?php echo e(asset('parent/images/logo.svg')); ?>" rel="shortcut icon">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Learning Management System, Student Management System, Great solution for Institute Managemtent system, Exam Management System">
        <meta name="keywords" content="Learning Management System, Student Management System, Great solution for Institute Managemtent system, Exam Management System, web app">
        <meta name="author" content="PALLAVIDIGHE">
        <title><?php echo e(config('app.name', 'Laravel')); ?></title>
        <!-- BEGIN: CSS Assets-->
        
        <link rel="stylesheet" href="<?php echo e(mix('css/app.css')); ?>">
        <link rel="stylesheet" href="<?php echo e(asset('parent/css/app.css')); ?>" />

        <!-- END: CSS Assets-->
    </head>
    <!-- END: Head -->
    <body class="login">
    
        <div id="app" data-page="<?php echo e(json_encode($page)); ?>"></div>
        <!-- BEGIN: JS Assets-->
        <?php echo app('Tightenco\Ziggy\BladeRouteGenerator')->generate(); ?>
        
        <script src="<?php echo e(mix('js/app.js')); ?>" defer></script>
        <script src="<?php echo e(asset('parent/js/app.js')); ?>"></script>
        <!-- END: JS Assets-->
    </body>
</html><?php /**PATH C:\xampp\htdocs\studycircle\parentsite\resources\views/app.blade.php ENDPATH**/ ?>