<?php
/**
 * Created by PhpStorm.
 * User: arman
 * Date: 24/01/2018
 * Time: 16:48
 */

class UserForm extends Form
{
    public function build()
    {
        $this->addFormField('lastName');
        $this->addFormField('firstName');
        $this->addFormField('address');
        $this->addFormField('city');
        $this->addFormField('zipCode');
        $this->addFormField('phone');
        $this->addFormField('email');
    }
}