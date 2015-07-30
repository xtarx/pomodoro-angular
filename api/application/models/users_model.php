<?php

class users_model extends MY_Model
{
	public $_table = 'users';


	public function generate_token($id)
	{		

		$data['token']=$this->generate_token_hash();
		$data['token_date']=date('Y-m-d');

		$this->update($id,$data);

		return $data['token'];

	}


	function generate_token_hash()
	{
		$token = md5(uniqid() . microtime() . rand());
		return $token;
	}

}