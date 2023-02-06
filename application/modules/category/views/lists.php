<style>
table{
  margin: 0 auto;
  width: 100%;
  clear: both;
  border-collapse: collapse;
  table-layout: fixed; 
  word-wrap:break-word; 
}
</style>
<?php
  $admin = $this->session->userdata('admin');
  $rights = explode(",",$admin['rights']);
?>
<div class="row page-titles">
  <div class="col-md-5 align-self-center">
    <h4 class="text-themecolor"><?php echo $breadcrumb;?></h4>
  </div>
  <div class="col-md-7 align-self-center text-right">
    <div class="d-flex justify-content-end align-items-center">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="<?php echo base_url();?>admin/dashboard">Home</a></li>
        <li class="breadcrumb-item active"><?php echo $breadcrumb;?></li>
      </ol>
    </div>
  </div>
</div>

<div class="col-12">
	<div class="card">
    <div class="card-body">
      <form id="form-filter" class="form-material">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label class="control-label">Status</label>
              <select class="form-control" id="categoryStatus" name="categoryStatus">
                <option value="">Select</option>
                <option value="1">Active</option>
                <option value="0">Deactive</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <button class="btn btn-block btn-outline-success btn-rounded" id="btn-filter">FILTER</button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-block btn-outline-danger btn-rounded" id="btn-reset">RESET</button>
          </div>
          <!--<div class="col-md-3">
            <button class="btn btn-block btn-rounded btn-outline-danger" id="delete_records">Delete</button>  
          </div>-->
		  <?php /*
		  if(in_array('2', $rights)){ */ ?>
          <div class="col-md-3">
            <a class="btn btn-block btn-rounded btn-outline-success" href="<?php echo base_url(); ?>category/add">Add New Category</a>  
          </div>
		  <?php //} ?>
        </div>
      </form>
    </div>
  
    <div class="card-body">
      <table id="CategoryTable" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Short Name</th>
            <th>Order</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  
  </div>
</div>
			