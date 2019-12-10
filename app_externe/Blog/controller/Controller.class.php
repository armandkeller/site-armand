<?php

require_once 'model/Posts.class.php';
require_once 'model/Comments.class.php';
require_once 'model/Authors.class.php';

require_once 'public/htmlpurifier-4.9.3/library/HTMLPurifier.auto.php';


class controller
{
    private $post;
    private $comment;
    private $author;
    private $config;
    private $purifier;


    public function __construct()
    {
        $this->post = new Posts();
        $this->comment = new Comments();
        $this->author = new Author();

        $this->config = HTMLPurifier_Config::createDefault();
        $this->config->set('HTML.Allowed', 'p,h1,h2,h3,h4,h5,h6,strong,span[style],ol,ul,li,u,blockquote,cite,em');
        $this->config->set('CSS.AllowedProperties', 'color');
        $this->purifier = new HTMLPurifier($this->config);
    }

    public function getPosts($path = 'view/frontend/homeView.phtml')
    {
        $result = $this->post->selectAllPosts();
        $authors = $this->author->listAuthors();
        require $path;

    }

    public function getPostWithComments()
    {
        $onePost = $this->post->selectOnePost($_GET['id']);
        if (empty($onePost)) {
            throw new Exception(' Aucun article trouvé');
        }
        $allComments = $this->comment->selectAllComments($_GET['id']);
        require 'view/frontend/postView.phtml';
    }

    public function getAdminWithPostAndAllComments()
    {
        $onePost = $this->post->selectOnePost($_GET['id']);
        if (empty($onePost)) {
            throw new Exception(' Aucun article trouvé');
        }
        $allComments = $this->comment->selectAllComments($_GET['id']);
        require 'view/backend/postWithCommentsView.phtml';
    }

    public function changePost()
    {

        $onePost = $this->post->selectOnePost($_GET['id']);
        $allComments = $this->comment->selectAllComments($_GET['id']);
        $result = $this->post->selectAllPosts();
        $authors = $this->author->listAuthors();
        $oneAuthor = $this->author->oneAuthor($_GET['idAuthor']);
        require 'view/backend/homeView.phtml';

    }

    public function addComment()
    {
        if (!empty($_POST['nickName']) && !empty($_POST['content'])) {
            $this->comment->addComment(htmlspecialchars($_POST['nickName']), htmlspecialchars($_POST['content']), $_GET['id']);
            header('Location: index.php?action=post&id=' . $_GET['id']);
        } else {
            throw new Exception('certains champs ne sont pas remplis');
        }
    }

    public function addAuthor()
    {
        if (!empty($_POST['firstName']) && !empty($_POST['lastName'])) {
            $this->author->insert(htmlspecialchars($_POST['firstName']), htmlspecialchars($_POST['lastName']));
            header('Location: index.php?action=admin');
        } else {
            throw new Exception('certains champs ne sont pas remplis');
        }
    }

    public function deletePost()
    {
        $this->post->deletePost($_GET['id']);
        header('Location: index.php?action=admin');
    }

    public function deleteComment()
    {
        $this->comment->deleteComment($_GET['id']);
        header('Location: index.php?action=adminAllComments&id='.$_GET['idPost']);
    }

    public function deleteAuthor()
    {
        $this->author->deleteAuthor(htmlspecialchars($_POST['author']));
        header('Location: index.php?action=admin');
    }

    public function insert()
    {
        if (!empty($_POST['title']) && !empty($_POST['content']) && !empty($_POST['author'])) {
            $this->post->insertPost(htmlspecialchars($_POST['title']), $this->purifier->purify($_POST['content']), htmlspecialchars($_POST['author']));
            header('Location: index.php?action=admin');
        } else {
            throw new Exception('certains champs ne sont pas remplis');
        }

    }

    public function update()
    {
        if (!empty($_POST['title']) && !empty($_POST['content']) && !empty($_POST['author']) && !empty($_POST['id'])) {
            $this->post->updatePost(htmlspecialchars($_POST['title']), $this->purifier->purify($_POST['content']), htmlspecialchars($_POST['author']), htmlspecialchars($_POST['id']));
            header('Location: index.php?action=admin');
        } else {
            throw new Exception('certains champs ne sont pas remplis');
        }
    }
}