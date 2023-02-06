<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH.'modules/generic/controllers/Generic.php';

/**
 * 	Author : NEELMANI
 */

class Visitors extends Generic{
	
	function __construct() {
		parent::__construct();
    $this->load->model('Mdl_visitors');
    $this->load->helper('captcha');
	}
  
  /* Visitor Listing*/
  
  /**
   *  listing page
   */
  function pending_image(){
    $this->adminSession('super');

    $template = 'admin';
    $data['scriptFile'] = 'pendingImage';
    $data['viewFile'] = 'list';
    $data['module'] = "visitors";
    echo Modules::run('template/'.$template, $data);
  }

  /**
   *  Get records
   */
  function getPendingImageRecords(){
    $records = $this->Mdl_visitors->get_datatables("visitors");
	
    $data = array();
    $no = $_POST['start']; 

    $max_limit = sizeof($records);
    $counter = 1;

    foreach ($records as $val){
      $row = array();
	  echo '<pre>'; print_r($records); exit;
    /*  
      $row[] = '<input type="checkbox" name="selectedRows[]" id="'.$val->id.'" value="'.$val->id.'">';

      $url = base_url().'admin/update/'.$val->id;
      $row[] = '<a class="btn btn-rounded btn-outline-success" href="'.$url.'">Update</a>';

      if($val->status == 'active'){
        $row[] = '<span class="badge badge-success">ACTIVE</span>';
      }else{
        $row[] = '<span class="badge badge-danger">INACTIVE</span>';
      }

      $row[] = $val->name;
      $row[] = $val->username;
      $row[] = $val->password_text;
      $row[] = date("d-m-Y",strtotime($val->created_at));
	  */
	
	  $row[] = $val->name;
	  $photo_name = $val->photo_name;
	  $row[] = $val->company;
	  $row[] = $val->category;
	  $row[] = $val->handover;
	  $row[] = $val->status;
	  
      $data[] = $row;
      $counter++;
    }

    $output = array(
      "draw" => $_POST['draw'],
      "recordsTotal" => $this->Mdl_visitors->count_all("visitors"),
      "recordsFiltered" => $this->Mdl_visitors->count_filtered("visitors"),
      "data" => $data,
    );

    echo json_encode($output);
  }
  
  
  
}