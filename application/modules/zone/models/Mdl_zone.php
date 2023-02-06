<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require_once APPPATH.'modules/generic/models/Mdl_generic.php';

class Mdl_zone extends Mdl_generic {
	
	function __construct() {
		parent::__construct();
	}
	
   var $table = 'zones';
  var $column_order = array(null,'name','status'); 
  var $column_search = array('name','status'); //set column field database for datatable searchable 
  var $order = array("created_at"=>'desc'); // default order 	
	
	private function _get_datatables_query(){
    //add custom filter here
    /*if($this->input->post('status'))
    {
      $this->db->where('status', $this->input->post('status'));
    } */
	//echo '==>'.$this->input->post('status');
	if($this->input->post('status')== "1"){
        $this->db->where('status', $this->input->post('status'));
    } else if($this->input->post('status')== "0"){
		 $this->db->where('status', $this->input->post('status'));
	} 

    $this->db->from($this->table);
    $i = 0;
  
    foreach ($this->column_search as $item) // loop column 
    {
      if($_POST['search']['value']) // if datatable send POST for search
      {        
        if($i===0) // first loop
        {
          $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
          $this->db->like($item, $_POST['search']['value']);
        }
        else
        {
          $this->db->or_like($item, $_POST['search']['value']);
        }

        if(count($this->column_search) - 1 == $i) //last loop
          $this->db->group_end(); //close bracket
      }
      $i++;
    }
    
    if(isset($_POST['order'])) // here order processing
    {
      $this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
    } 
    else if(isset($this->order))
    {
      $order = $this->order;
      $this->db->order_by(key($order), $order[key($order)]);
    }
  }

  public function get_datatabless(){
    $this->_get_datatables_query();
    if($_POST['length'] != -1)
    $this->db->limit($_POST['length'], $_POST['start']);
    $query = $this->db->get();
 //   echo $this->db->last_query(); exit;
    return $query->result();
  }

  public function count_filtereds(){
    $this->_get_datatables_query();
    $query = $this->db->get();
    return $query->num_rows();
  }

  public function count_alls(){
    $this->db->from($this->table);
	//echo $str = $this->db->last_query(); exit; 
    return $this->db->count_all_results();
  } 
  
  function getByValue($table, $col, $val){
		$this->db->where($col, $val);
		$query=$this->db->get($table);
		if($query->num_rows() > 0){
			return $query->result(); 
		}else{
			return "No Data";
		} 
	}

}