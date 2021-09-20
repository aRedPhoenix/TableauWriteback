tableau.extensions.initializeDialogAsync();

function updateRequest(arg){
  const exLead = document.getElementById("exLead").value;
  const srAnalyst = document.getElementById("srAnalyst").value;
  const analyst = document.getElementById("analyst").value;
  const start_date =  document.getElementById("start_date").value;
  const expected_end_date = document.getElementById("expected_end_date").value;
  const progress = document.getElementById("progress").value;
  const description = document.getElementById("description").value;
  $.post("/update/" + arg, {exLead,srAnalyst,analyst,start_date,expected_end_date,progress,description}, updated =>{
    tableau.extensions.ui.closeDialog(updated);
  });
};