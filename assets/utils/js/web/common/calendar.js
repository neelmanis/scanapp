  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      navLinks: true, // can click day/week names to navigate views
      dayMaxEvents: true, // allow "more" link when too many events
       events:events,
      // events: {
      //   url: CI_ROOT+'common/getIntegratedCalendarEvents',
      //   failure: function() {
      //     document.getElementById('script-warning').style.display = 'block'
      //   }
      // },
     
      eventClick: function(info) {
         let event_cat =   info.event._def.extendedProps.Source;
         let id = info.event._def.publicId;
         let url;
         if(event_cat =="case"){
          url = CI_ROOT + 'common/getProceduralCalendarInfo';
         }else{
          url = CI_ROOT + 'common/getStatusCalendarInfo';
         }
        $.ajax({
            type : 'POST',
            data : {id:id},
            url : url,
            dataType: "json",
            success:function(result){
              $("#calendar-modal-box").html(result.output);
              $('#calendar-modal').modal({ backdrop: 'static', keyboard: false});
      
            }
        });
      },
      loading: function(bool) {
        document.getElementById('loading').style.display =
          bool ? 'block' : 'none';
      }
    });
    calendar.render();
  });

