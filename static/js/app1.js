// import the data from data.js
const tableData = data;

// Reference the HTML table using d3,tell JavaScript to look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");

// Function of populate data into html table
function buildTable(data) {
    // init table data
    tbody.html('');

    // first array loop for <tr>
    data.forEach((dataRow) => {
        let row = tbody.append('tr'); //html
        //second loop for <td>
        Object.values(dataRow).forEach((val) =>{
            let cell = row.append('td'); //html
            // d3 funtion 
            cell.text(val);
        });
    });

};

// Create a variable to keep track of all the filters as an object.
var clearEntries = d3.select("#clear-btn");
clearEntries.on("click", function() {
  location.reload();
});


// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let inputElement = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    let inputValue = inputElement.property("value");

    // 4c. Save the id of the filter that was changed as a variable.
    let inputID = inputElement.attr("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
	    if (inputValue) {
        filters[inputID] = inputValue;
    } else{filters ={};};
  
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable(filters);
};

// 7. Use this function to filter the table when data is entered.
function filterTable(obj) {
  
   //8. set a default filter and save it to a new variable
    let filteredData = tableData;
  
   
    // 9. Use a forEach Loop through all of the filters and keep any data that
    // matches the filter values
	Object.entries(obj).forEach(([fkey, fval]) =>{
      filteredData = filteredData.filter((row) => row[fkey] === fval)

 });
  
    // 10.Rebuild the table using the filtered data
    buildTable(filteredData);
 };
  
  // 2. Attach an event to listen for the form button
  d3.selectAll("input").on("change",updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);