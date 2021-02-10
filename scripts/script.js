var NumberOfQueues = 0;
var NumberOfForms = 0;

function addQueue() {
    NumberOfQueues++;
    if (NumberOfQueues > 1) {
        console.log("NumberOfForms" + NumberOfForms);
        NumberOfForms++;
        // Remove Button to Add Next Queue Tab
        var AddQueueButton = document.getElementById("AddQueueButtonContainer");
        AddQueueButton.remove();

        // Add New Queue Tab
        $('#QueueRow').append(`
        <form class="col-md-6 mb-3 needs-validation" id="`+ NumberOfForms + `" novalidate>
    <div id="form">
        <button id="closeButton`+ NumberOfForms + `" class="closeButton" ><i class="material-icons">close</i></button>

        <div class="form-group row d-flex justify-content-around  pl-4 pr-4 pt-5 pb-1">
            <label for="inputCompanyId" class="col-sm-2.2 col-form-label text-white pl-3 pt-2" id="companyId">Company
                Id</label>
            <div class="col-sm-6 mt-1 w-100 pl-1" id="searchField">
                <div class="input-group md-form form-sm form-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="searchIcon"><i class="fas fa-search"
                                aria-hidden="true"></i></span>
                    </div>
                    <input class="form-control" type="number" placeholder="Search" aria-label="Search"
                        id="inputCompanyId" required>
                </div>
            </div>
            <button class="col-sm-2 pr-0 pl-0" type="submit" id="searchButton">Search
            </button>
            <div class="loader`+ NumberOfForms + `" id="loader"></div>
        </div>
        <p class="text-center text-danger mr-5 mb-4" id="validationError`+ NumberOfForms + `"></p>
        <div class="form-group row d-flex justify-content-around pl-5 pr-4 pb-2">
            <label class="col-sm-2.3 col-form-label text-white ml-4" id="queueId">Queue Id</label>
            <select class="col-sm-5 dropdown ml-0 rounded" id="select`+ NumberOfForms + `">
            </select>
            <div class="form-check mt-2 mr-6">
                <input type="checkbox" class="form-check-input mt-2" id="checkBox`+ NumberOfForms + `" checked>
                <label class="form-check-label mr-5" for="exampleCheck1" id="checkboxText">Hide
                    Inactive</label>
            </div>
        </div>
        <div class="row">
        <div class="loader2`+ NumberOfForms + `" id="loader2"></div>
        <div class="form-group row d-flex justify-content-around pl-4 pr-4 pb-2">
            <div id="chart_div`+ NumberOfForms + `"></div>
        </div>
        </div>
    </div>

    </div>
</form>`);

        // Add Back button to the end of the new Queue Tab
        $('#QueueRow').append(`<div class="col-md-6 mb-2" id="AddQueueButtonContainer">
        <button type="button" class="btn btn-lg btn-block text-white" id="addQueueButton"
            onclick="addQueue()">
            <i class="material-icons align-text-bottom text-white">add_circle_outline</i>Add
            another</button>
    </div>`);

    } else {
        // If its the first Queue Tab, Add a new Queue Tab before the button 
        $('#QueueRow').prepend(`
        <form class="col-md-6 mb-3 needs-validation" id="`+ NumberOfForms + `" novalidate>
    <div id="form">
        <button id="closeButton`+ NumberOfForms + `" class="closeButton" ><i class="material-icons">close</i></button>

        <div class="form-group row d-flex justify-content-around  pl-4 pr-4 pt-5 pb-1">
            <label for="inputCompanyId" class="col-sm-2.2 col-form-label text-white pl-3 pt-2" id="companyId">Company
                Id</label>
            <div class="col-sm-6 mt-1 w-100 pl-1" id="searchField">
                <div class="input-group md-form form-sm form-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="searchIcon"><i class="fas fa-search"
                                aria-hidden="true"></i></span>
                    </div>
                    <input class="form-control" type="number" placeholder="Search" aria-label="Search"
                        id="inputCompanyId" required>
                </div>
            </div>
            <button class="col-sm-2 pr-0 pl-0" type="submit" id="searchButton">Search
            </button>
            <div class="loader`+ NumberOfForms + `" id="loader"></div>
        </div>
        <p class="text-center text-danger mr-5 mb-4" id="validationError`+ NumberOfForms + `"></p>
        <div class="form-group row d-flex justify-content-around pl-5 pr-4 pb-2">
            <label class="col-sm-2.3 col-form-label text-white ml-4" id="queueId">Queue Id</label>
            <select class="col-sm-5 dropdown ml-0 rounded" id="select`+ NumberOfForms + `">
            </select>
            <div class="form-check mt-2 mr-6" id="checkBox">
                <input type="checkbox" class="form-check-input mt-2" id="checkBox`+ NumberOfForms + `" checked>
                <label class="form-check-label mr-5" for="exampleCheck1" id="checkboxText">Hide
                    Inactive</label>
            </div>
        </div>
        <div class="row">
        <div class="loader2`+ NumberOfForms + `" id="loader2"></div>
        <div class="form-group row d-flex justify-content-around pl-4 pr-4 pb-2">
            <div id="chart_div`+ NumberOfForms + `"></div>
        </div>
        </div>
    </div>

    </div>
</form>`);
    }
    AddEvents(NumberOfForms);
}

function AddEvents(formId) {
    // addEventListener for the element with NumberOfForms
    // if NumberOfForms is 0, find the element with NumberOfForms as the Id
    document.getElementById(formId).addEventListener("submit", function (ev) {
        ev.preventDefault();
        clearForm(this, this.id);
        if (validateInput(this, this.id)) {
            searchCompany(this, this.id);
        }
    });

    document.getElementById("closeButton" + formId).addEventListener("click", function (ev) {
        removeForm(formId)
    });
}
//chnage to heroku
const host = "https://ades-2b03.herokuapp.com"
// const host = "http://localhost:8080"
function searchCompany(form, formId) {
    var text = document.getElementById("validationError" + formId);
    var formElement = document.getElementById(formId);
    var loader = formElement.getElementsByClassName("loader" + formId)[0];
    var companyId = form.elements["inputCompanyId"].value;
    loader.style.visibility = 'visible';
    console.log('sending http request for formId ' + formId);
    jQuery.ajax({
        method: 'GET',

        url: `${host}/company/queue?company_id=${companyId}`
    }).done(function (data) {
        console.log("request successful sent");
        loader.style.visibility = 'hidden';
        populateSelect(data, form, formId);
        if (data.length == 0) {
            text.innerHTML = "Unknown Company Id";
        }
    }).fail(function (data, status, xhr) {
        text.innerHTML = "Unable to connect to backend!";
        loader.style.visibility = 'hidden';
    });
}

function removeForm(formId) {
    console.log("formId " + formId);
    var form = document.getElementById(formId);
    closegraph(formId);
    form.remove();
};

function populateSelect(data, form, formId) {
    var queueArray = data;
    var element = form.elements["select" + formId];
    element.innerHTML = element.innerHTML + '<option value=" " id="defaultValue" disabled selected>' + "Select Queue Id" + '</option>';
    for (var i = 0; i < queueArray.length; i++) {
        if (queueArray[i].is_active == 1) {
            element.innerHTML = element.innerHTML + '<option value="' + queueArray[i].queue_id + '">' + queueArray[i].queue_id + '</option>';
        } else if (queueArray[i].is_active == 0)
            element.innerHTML = element.innerHTML + '<option value="' + queueArray[i].queue_id + '" class="inactiveQueue' + formId + '">' + queueArray[i].queue_id + '[X]' + '</option>';
    }

    document.getElementById("checkBox" + formId).addEventListener('change', (event) => {
        checkIsActive(formId)
    });

    document.getElementById("select" + formId).addEventListener("change", function () {
        let current_queue = this.parentElement.parentElement.parentElement.id;
        let selectedoption = this.options[this.selectedIndex].value;
        graphchange(current_queue, selectedoption)
    });
    checkIsActive(formId);
}

function checkIsActive(formId) {
    console.log("CIA id: " + formId);
    var checkBox = document.getElementById("checkBox" + formId);
    if (checkBox.checked == true) {
        $(".inactiveQueue" + formId).css("visibility", "hidden");
        $(".inactiveQueue" + formId).css("display", "none");

    }
    else if (checkBox.checked == false) {
        $(".inactiveQueue" + formId).css("visibility", "visible");
        $(".inactiveQueue" + formId).css("display", "block");

    }
}

//remove pervious options
function clearForm(form, formId) {
    document.getElementById("validationError" + formId).innerHTML = "";
    var select = form.elements["select" + formId];
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
        select.options[i] = null;
    }
    closegraph(formId)

}

function validateInput(form, formId) {
    var input, text;
    // Get the value of the input field with id
    input = form.elements["inputCompanyId"].value;
    text = document.getElementById("validationError" + formId);

    // If x is Not a Number or less than one or greater than 10
    if (isNaN(input) || input.length == 0) {
        text.innerHTML = "A valid Company Id is required!";
    }
    else if (input < 1000000000) {
        text.innerHTML = "Company Id less than 10 digits";
    }
    else if (input > 9999999999) {
        text.innerHTML = "Company Id more than 10 digits";
    } else {
        return true;
    }
    return false;
}

