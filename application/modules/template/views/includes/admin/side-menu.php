<?php
  $admin_session = $this->session->userdata('admin');
  $is_superadmin = $admin_session['is_superadmin'];
  $rights_str = $admin_session['rights'];
  $rights = explode(",",$rights_str);
?>

<aside class="left-sidebar">
  <div class="scroll-sidebar">
    <nav class="sidebar-nav">
      <ul id="sidebarnav">
      
        <!-- Dashboard -->
        <li>
          <a class=" waves-effect waves-dark" href="<?php echo base_url('admin/dashboard')?>" aria-expanded="false"><i class="ti-bar-chart"></i><span class="hide-menu">Dashboard</span></a>
        </li>

        <!-- Admin -->
        <?php if($is_superadmin == "Y"){ ?>
        <li>
          <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="ti-id-badge"></i><span class="hide-menu">Admins</span></a>
          <ul aria-expanded="false" class="collapse">
            <li><a class="submenu-name" href="<?php echo base_url(); ?>admin/list"><span class="submenu-name">View All</span></a></li>

            <li><a class="submenu-name" href="<?php echo base_url(); ?>admin/roles/list"><span class="submenu-name">Manage Roles</span></a></li>
          </ul>
        </li>
        <li>
          <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="ti-id-badge"></i><span class="hide-menu">Masters</span></a>
          <ul aria-expanded="false" class="collapse">
            <li><a class="submenu-name" href="<?php echo base_url(); ?>zone/lists"><span class="submenu-name">Zone</span></a></li>

            <li><a class="submenu-name" href="<?php echo base_url(); ?>category/lists"><span class="submenu-name">Categories</span></a></li>
          </ul>
        </li>
        <?php } ?>

        <!-- Master -->
        <?php if($is_superadmin == "Y" || in_array("4",$rights)){ ?>
 
        <li>
          <a class="waves-effect waves-dark" href="<?php echo base_url(); ?>visitors/all_visitors" aria-expanded="false"><i class=" ti-user"></i><span class="hide-menu">All Visitor</span>
          </a>
        </li>
        <!-- <li>
          <a class="waves-effect waves-dark" href="<?php echo base_url(); ?>visitors/pending_image" aria-expanded="false"><i class="icon-user-unfollow"></i><span class="hide-menu">Pending Visitor</span>
          </a>
        </li> -->
        
        <?php } ?>

        <!-- Institution -->
        <?php if($is_superadmin == "Y" || in_array("2",$rights)){ ?>
        <!-- <li>
          <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="ti-shield"></i><span class="hide-menu">Institution</span></a>
          <ul aria-expanded="false" class="collapse">
            <li><a class="submenu-name" href="<?php echo base_url(); ?>institution/list"><span class="submenu-name">List</span></a></li>
            <li><a class="submenu-name" href="<?php echo base_url(); ?>excel/institution"><span class="submenu-name">Export Excel</span></a></li>
          </ul>
        </li> -->
        <?php } ?>
        <?php if($is_superadmin == "Y" || in_array("2",$rights)){ ?>
          <!-- <li>
            <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="ti-book"></i><span class="hide-menu">Export Scan Report </span></a>
            <ul aria-expanded="false" class="collapse">
              <li><a class="submenu-name" href="<?php //echo base_url("excel/scan_report"); ?>"><span class="submenu-name">Export Excel Scan Report</span></a></li>
            </ul>
          </li> -->
        <?php } ?>

      </ul>
    </nav>
  </div>
</aside>