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
        $response=$CI->users_model->get_by( array('email' =>$email,'password' =>$password ));

    }else{

        $cook=$CI->input->get_request_header('Cookie');
        $input = $cook;
        preg_match('~%22%3A%22(.*?)%22%3A%22~', $input, $output);

        $res=explode("%22%2C%2", $output[1]);
        $email=urldecode($res[0]);

        // echo($email);
        $response=$CI->users_model->get_by( array('email' =>$email));

    }

    if($response){
        return $response['id'];
    }
    return false;

}










?>