<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');



function is_authorized()
{
    $CI =& get_instance();
    $CI->load->model('users_model');
    
    if ($CI->input->get_request_header('Authorization')) {
        if (strpos(strtolower($CI->input->get_request_header('Authorization')), 'basic') === 0) {
            list($email, $password) = explode(':', base64_decode(substr($CI->input->get_request_header('Authorization'), 6)));
        }
    }
    // echo($password);
    // return !!$CI->users_model->get_by( array('email' =>$email,'password' =>$password ));
    $response=$CI->users_model->get_by( array('email' =>$email,'password' =>$password ));

    if($response){
        return $response['id'];
    }
    return false;

}










?>