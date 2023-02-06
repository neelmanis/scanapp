<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH.'modules/generic/controllers/Generic.php';

/**
 * 	Author : Amit Kashte
 */
class Counter extends Generic{

	function __construct() {
		parent::__construct();
		$this->load->model('Mdl_admin');
	}

  /**
   *  Users count
   */
  function users( $param="" ){
    if($param){
      $users = $this->Mdl_admin->countRecords("registration",array());
    }else{
      $users = $this->Mdl_admin->countRecords("registration",array("1"=>"1"));
    }
    return $users;
  }

  function activeUsers($param) {
    if($param){
        $activeUsers = $this->Mdl_admin->countRecords("registration",array("status"=>$param));
      }else{
        $activeUsers = $this->Mdl_admin->countRecords("registration",array("1"=>"1"));
      }
      return $activeUsers;
  }
  /**
   *  Nomination count
   */
  function institution(){
    $instititution = $this->Mdl_admin->countRecords("profile_institution",array("1"=>"1"));
    $instititution = $instititution !== "NA" ? $instititution : 0;

    // $_NOMINATION_REGISTRATION_QUERY = "SELECT COUNT(n.nomination_id) AS counter FROM nomination n RIGHT JOIN registration r ON n.cand_email=r.email";
    // $registerdNominee = $this->Mdl_admin->customQuery($_NOMINATION_REGISTRATION_QUERY);
    // $nomineeCount = $registerdNominee !== "NA" ? $registerdNominee[0]->counter : 0;
  
    return $instititution;
  }

  /**
   *  Applications count
   */
  function arbitrators( $param="" ){
    if($param){
      $arbitrators = $this->Mdl_admin->countRecords("profile_arbitrator",array());
    }else{
      $arbitrators = $this->Mdl_admin->countRecords("profile_arbitrator",array());
    }
    return $arbitrators;
  }

  function cases( $param="" ){
    if($param){
      $cases = $this->Mdl_admin->countRecords("case_details",array());
    }else{
      $cases = $this->Mdl_admin->countRecords("case_details",array());
    }
    return $cases;
  }

  function activeCases($param) {
    if($param){
        $activeCases = $this->Mdl_admin->countRecords("case_details",array("status"=>"1"));
      }else{
        $cases = $this->Mdl_admin->countRecords("case_details",array());
      }
      return $activeCases;
  }

}