<?php defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/REST_Controller.php');

/**
 * Users API controller
 *
 * Validation is missign
 */
class Users extends REST_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->model('users_model');
	}

	
	public function authenticate_post()
	{
		
		$response=$this->users_model->get_by(array('email' =>$this->post('email') , 'password' =>$this->post('password')));

		if ( ! $response)
		{
			$this->response(array('success' => true, 'message' => 'email or password is incorrect'), 200);
		}

		//generate token
		$token=$this->users_model->generate_token($response['id']);
		
		$this->response(array('success' => true,'token' => $token, 'message' => 'success'), 200);

	}


	public function edit_get($id = NULL)
	{
		if ( ! $id)
		{
			$this->response(array('success' => false, 'error_message' => 'No ID was provided.'), 400);
		}

		$this->response($this->users_model->get($id));
	}

	public function add_post()
	{

		$already_there=$this->users_model->get_by(array('email' =>$this->post('email')));

		if ( ! $already_there)
		{
			$response = $this->users_model->insert($this->post());

			$this->response(array('success' => true,  'message' => 'success'), 200);
		}
		else
		{
			$this->response(array('success' => false, 'message' => 'Email already exist'), 200);
		}
	}


}

/* End of file Projects.php */
/* Location: ./application/controllers/api/Projects.php */
