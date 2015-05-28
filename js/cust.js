$("#main").live("pageshow", function(event, data) {
        //add icons to horizontal checkbox group
        $("#twitterlbl").children("span").append("<span class='ui-icon ui-icon-shadow ui-icon-checkbox-off'>").trigger("create");
        $("#twitterlbl").addClass("ui-btn-icon-left").trigger("refresh");
        $("#facebooklbl").children("span").append("<span class='ui-icon ui-icon-shadow ui-icon-checkbox-off'>").trigger("create");
        $("#facebooklbl").addClass("ui-btn-icon-left").trigger("refresh");
        updatePosts();
        updateComments();
        $("#posts").bind("change", updatePosts);
        $("#comments").bind("change", updateComments);
      });
      
      //update checkbox styles on change event
      //add ui-btn-active style to vertical checkbox group
      function updatePosts(event, ui) {
        if($("#posts").prop("checked")) {
          $("#postslbl").addClass("ui-btn-active").trigger("refresh");
        } else {
          if($("#postslbl").hasClass("ui-btn-active"))
            $("#postslbl").removeClass("ui-btn-active").trigger("refresh");
        }
      }
      
      function updateComments(event, ui) {
        if($("#comments").prop("checked")) {
          $("#commentslbl").addClass("ui-btn-active").trigger("refresh");
        } else {
          if($("#commentslbl").hasClass("ui-btn-active"))
            $("#commentslbl").removeClass("ui-btn-active").trigger("refresh");
        }
      }