<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH.'modules/generic/controllers/Generic.php';

class Category extends Generic
{
	function __construct() {
		parent::__construct();
		$this->load->model('Mdl_category');	
	}

	/*
	  **  Admin Listing Page
	 */	 
	function lists(){
    if(!Modules::run('security/isAdmin')){
      redirect('admin','refresh');
    }

    $template = 'admin';
    $data['scriptFile'] = 'category';
	$data['breadcrumb'] = "Manage Category";
    $data['viewFile'] = 'lists';
    $data['module'] = "category";
    echo Modules::run('template/'.$template, $data);
	}
  
	function getCategoryLists()
	{
	if(!Modules::run('security/isAdmin')){
      redirect('admin','refresh');
    }		
	$list = $this->Mdl_category->get_datatabless("category_master");
	//echo '<pre>'; print_r($list); exit;
    $data = array();
    $no = $_POST['start'];

	$admin_session = $this->session->userdata('admin');
    $rights_string = $admin_session['rights'];
    $rights_array = explode(',' , $rights_string); 
	
    foreach ($list as $categories) {
      $row = array();
      $row[] = $categories->id;
	  $row[] = strtoupper($categories->cat_name);
	  $row[] = strtoupper($categories->short_name);
	  $row[] = $categories->sort_order;	  

      if($categories->status == '1'){
          $sattus = '<span class="badge badge-success">ACTIVE</span>';
        }else{
          $sattus = '<span class="badge badge-danger">DEACTIVE</span>';
        }
		$row[] = $sattus;		
		
		/*if(in_array('3', $rights_array)){ */
        $url   = base_url().'category/update/'.$categories->id;
        $row[] = '<a class="btn btn-rounded btn-outline-success" href="'.$url.'">Edit</a>';
        /*} else {
         $row[] = '';
		} */
	  
        $data[] = $row;
    }

    $output = array(
      "draw" => $_POST['draw'],
      "recordsTotal" => $this->Mdl_category->count_alls(),
      "recordsFiltered" => $this->Mdl_category->count_filtereds(),
      "data" => $data,
    );
    //output to json format
    echo json_encode($output);
	}	

	function add(){
		$template = 'admin';
		$data['breadcrumb'] = "Add Category";
		$data['viewFile'] = "add";
		$data['scriptFile'] = "category";
		$data['page'] = 'categories';
		$data['menu'] = 'add';
		echo Modules::run('template/'.$template, $data);
	}
	
    /**
   * Add Action
   */
  function addAction(){
    $content = $this->input->post();
	$token= $this->session->userdata("token");
    if($content["csrfToken"] == $token){
		
    $this->form_validation->set_rules("cat_name","Name","trim|required|max_length[100]|xss_clean",
    array(
      'required' => 'Name is required'
    ));
	$this->form_validation->set_rules("short_name","short_name","trim|required|max_length[150]|xss_clean",
    array(
      'required' => 'Short Name is required'
    ));
	
	$this->form_validation->set_rules('order','Sort Order','trim|required|xss_clean');
	$this->form_validation->set_rules('status','Status','trim|required|is_natural|xss_clean');

    if($this->form_validation->run($this) == FALSE){
      $errors = $this->form_validation->error_array();
      echo json_encode($errors); exit;
    } else {
	  
		if($this->session->userdata('admin')){
			$admin = $this->session->userdata('admin');
			$adminId = $admin['admin_id'];
		}
		
		$data = array(
			'cat_name'=> strip_tags(strtoupper($content['cat_name'])),
			'short_name'=> strip_tags(strtoupper($content['short_name'])),
			'sort_order'=> $content['order'],
			'admin_id'=> $adminId,
			'status'=> $content['status']
		);
      $insert = $this->Mdl_category->insert("category_master", $data);
      echo json_encode(array("status"=>"success","title"=>"Success","icon"=>"success","message"=>'Category added successfully.',"redirect"=>'category/lists')); exit;
    }
	 }else{
      echo json_encode(array("status"=>"invalid")); exit;
    }
  }
  
	/**
	* Update Category
   */
  function update($id){
    if(!Modules::run('security/isAdmin')){
      redirect('admin/login','refresh');
    }

    $result = $this->Mdl_category->retrieve("category_master",array("id"=>$id));
    if($result == "NA"){
      redirect('errors','refresh');
    } else {
	          $template = 'admin';
      $data['category'] = $result;
	  $data['breadcrumb'] = "Update Category";
      $data['viewFile'] = "update";
      $data['scriptFile'] = "category";
      $data['module'] = "category";
      echo Modules::run('template/'.$template, $data);
    }
  }

  /**
   * Update Product Action
   */

  function updateAction(){
    $content = $this->input->post();
	
	$this->form_validation->set_rules('id','CategoryID','trim|required|numeric|xss_clean');
	
	$this->form_validation->set_rules("cat_name","Name","trim|required|max_length[100]|xss_clean",
    array(
      'required' => 'Name is required'
    ));
	$this->form_validation->set_rules("short_name","short_name","trim|required|max_length[150]|xss_clean",
    array(
      'required' => 'Short Name is required'
    ));
	
	$this->form_validation->set_rules('order','Sort Order','trim|required|xss_clean');
	$this->form_validation->set_rules('status','Status','trim|required|is_natural|xss_clean');
	
    if($this->form_validation->run($this) == FALSE){
      $errors = $this->form_validation->error_array();
      echo json_encode($errors); exit;
    } else {

		if($this->session->userdata('admin')){
			$admin = $this->session->userdata('admin');
			$adminId = $admin['admin_id'];
		}
		
	  $data = array(
			'cat_name'=> strip_tags(strtoupper($content['cat_name'])),
			'short_name'=> strip_tags(strtoupper($content['short_name'])),
			'sort_order'=> $content['order'],
			'admin_id'=> $adminId,
			'status'=> $content['status']
      );
      $update = $this->Mdl_category->update2("category_master","id",$content['id'], $data);
      echo json_encode(array("status"=>"success","title"=>"Success","icon"=>"success","message"=>'Category updated successfully.',"redirect"=>'category/lists')); exit;
    }
  }
  
	
}