<?php



require 'controller/Controller.class.php';
$controller = new Controller;


try {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'posts':
                $controller->getPosts();
                break;

            case 'post':
                $controller->getPostWithComments();
                break;

            case 'addComment':
                $controller->addComment();
                break;

            case 'admin':
                $controller->getPosts('view/backend/homeView.phtml');
                break;
            case 'adminAllComments':
                $controller->getAdminWithPostAndAllComments();
                break;

            case 'delete':
                $controller->deletePost();
                break;

            case 'deleteComment':
                $controller->deleteComment();
                break;

            case 'deleteAuthor':
                $controller->deleteAuthor();
                break;

            case 'insert':
                $controller->insert();
                break;

            case 'insertAuthor':
                $controller->addAuthor();
                break;

            case 'change':
                $controller->changePost();
                break;

            case 'updatePost':
                $controller->update();
                break;
                default:
        }
    } else {
        $controller->getPosts();
    }
}
catch (Exception $e) {
    echo 'Erreur:'. $e->getMessage();
}