    const addCards = (items) => {
    items.forEach((item) => {
      let itemToAppend = `<div class="col s2 center-align">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light img-padding">
            <img class="activator" src=${item.image} height="200">
          </div>
          <div class="card-content">
            <span class="card-titles activator grey-text text-darken-2">${item.title}</span>
          </div>
          <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
              <p class="card-text">${item.description}</p>
          </div>
        </div>
      </div>`;
      $("#card-section").append(itemToAppend);
    });
  };
  
  const donationSubmitForm = () => {
    let formData = {};
    let error = false;
    formData.name = $("#name").val();
    formData.phoneNumber = $("#phone-number").val();
    formData.title = $("#title").val();
    formData.description = $("#description").val();
  
    if (!formData.name) {
      document.getElementById("name").classList.remove("valid");
      document.getElementById("name").classList.add("invalid");
      error = true;
    }
    if (!formData.phoneNumber) {
      document.getElementById("phone-number").classList.remove("valid");
      document.getElementById("phone-number").classList.add("invalid");
      error = true;
    }
    if (!formData.title) {
      document.getElementById("title").classList.remove("valid");
      document.getElementById("title").classList.add("invalid");
      error = true;
    }
    if (!formData.description) {
      document.getElementById("description").classList.remove("valid");
      document.getElementById("description").classList.add("invalid");
      error = true;
    }
    if (!error) {
      const button = document.getElementById("donation-submit");
      button.innerHTML = "Saving details ..";
      button.setAttribute("disabled", "");
      $.post("/api/user/donation", formData, (response) => {
        if (response.message !== "Successful") {
          button.removeAttribute("disabled");
          button.innerHTML = "submit";
          alert(response.message);
        } else {
          button.removeAttribute("disabled");
          button.innerHTML = "submit";
          $("#name").val("");
          $("#title").val("");
          $("#description").val("");
          $("#phone-number").val("");
          alert(
            "Sit Back and Relax. We will reach out to you on your phone number for further information."
          );
        }
        $(".modal").modal("close");
      });
    }
  };
  
  const getCardDetails  = () => {
    $.get('/api/products', (response)=>{
        if(response.statusCode === 200){
            addCards(response.data)
        }
  
    })
}

  $(document).ready(function () {
    $(".dropdown-trigger").dropdown();
    $(".materialboxed").materialbox();
    $(".modal").modal();
    $("#donation-submit").click(() => {
      donationSubmitForm();
    });
    $("#logout").click(() => {
      window.location.href = "/";
    });
    getCardDetails();
  });
  