<?php defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/REST_Controller.php');

/**
 * Pomodoros API controller
 *
 * Validation is missign
 */
class Pomodoros extends REST_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->model('pomodoros_model');
	}

	public function index_get()
	{
		$user_id=is_authorized();
		$date=date('Y-m-d');
		$count=0;	
		$user_count=$this->pomodoros_model->get_by( array('user_id' => $user_id,'date' => $date, ));
			
		if($user_count){
			$count=$user_count['count'];
		}	
		$this->response($count);
	}

	public function countByDay_get()
	{
		$user_id=is_authorized();
		$date=$this->post('date');
		$this->response($this->pomodoros_model->count_by( array('user_id' => $user_id,'date' => $date, )));
	}

	
	
	public function add_post()
	{
		$user_id=is_authorized();
		$date=date('Y-m-d');

		$data=array('user_id' => $user_id,'date' => $date);
		$already_there=$this->pomodoros_model->get_by($data);

		if ( ! $already_there)
		{
			
			$data['count']=1;
			$response = $this->pomodoros_model->insert($data);

			$this->response(array('success' => true,  'message' => 'success'), 200);
		}
		else
		{

			$id=$already_there['id'];			
			$this->db->where('id', $id);
			$this->db->set('count', 'count+1', FALSE);
			$this->db->update('pomodoros');
			$this->response(array('success' => true, 'message' => 'pomodoro count incremented successfuly'), 200);
		}

	}
	


}

/* End of file Projects.php */
/* Location: ./application/controllers/api/Projects.php */