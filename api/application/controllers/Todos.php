<?php defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/REST_Controller.php');

/**
 * Todos API controller
 *
 * Validation is missign
 */
class Todos extends REST_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->model('todos_model');

		// is_authorized()

	}

/**
 * return undone tasks + 10 done tasks earlier sorted by date desc
 * @return [type] [description]
 */
public function index_get()
{
	$user_id=is_authorized();

	// $data['add_date']=date('Y-m-d');
	$data['user_id']=$user_id;
	$data['done']=false;
	$undone_tasks=$this->todos_model->get_many_by($data);

	//past 10 done tasks
	//
	$this->db->limit(10);
	$this->db->order_by("created_at", "desc"); 
	$done_tasks=$this->todos_model->get_many_by(array('user_id' =>$user_id ,'done' =>true));
	$response=	array_merge($undone_tasks,$done_tasks);

	$this->response($response);
}

public function edit_post($id = NULL)
{
	$user_id=is_authorized();
	$data=$this->post();
	$data['user_id']=$user_id;

	if ( ! $id)
	{
		$this->response(array('success' => false, 'error_message' => 'No ID was provided.'), 400);
	}

	$this->response($this->todos_model->update($id,$data));
}


public function add_post()
{
	$user_id=is_authorized();
	$data=$this->post();
	$data['add_date']=date('Y-m-d');
	$data['user_id']=$user_id;

	$response = $this->todos_model->insert($data);
	$this->response(array('success' => true,  'message' => 'success'), 200);
}

public function done_get($id)
{

	$data['done']=1;
	$data['done_date']=date('Y-m-d');
	$task_state=$this->todos_model->get($id);
	if($task_state){
		($task_state['done']==1)?$data['done']=0:$data['done']=1;
	}

	// print_r($data);
//toggle 


	$this->todos_model->update($id, $data);

	$this->response(array('success' => true,  'message' => 'success'), 200);
}

public function remove_delete($id = NULL)
{
	if ($this->todos_model->delete($id))
	{
		$this->response(array('success' => true, 'message' => sprintf('Project #%d has been deleted.', $id)), 200);
	}
	else
	{
		$this->response(array('success' => false, 'error_message' => 'This project does not exist!'), 404);
	}
}

}

/* End of file Projects.php */
/* Location: ./application/controllers/api/Projects.php */