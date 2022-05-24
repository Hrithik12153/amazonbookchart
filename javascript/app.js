var bookname=[];
var bookId= [];
var author= [];
var Year= [];
var Price$=[];
var rating = ["ratings"];
var id=[];
let user;
let ty='';
let state=true;
let tableBody = '';

function getbook(){
	Papa.parse("../data/Bookoverview.csv", {
		download: true,
		complete: function(results) {
			get(results.data);
		}
	});
}

function parseData(createGraph) {
	Papa.parse("../data/rating.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	console.log(data);
	for (var i = 1; i < data.length; i++) {
		if(data[i][0]==user){
			id.push(data[i][0]);
			bookId.push(data[i][1]);
			rating.push(data[i][2]);
		}
		else{
			continue;
		}
	}
	getbook();
	console.log(id,bookId,rating,bookname);
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	rating
	        ],
			type: ty
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: bookId,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 12
                	}
            	}
	        }
	    },
		bar:{
			width:{
				ratio:0.5
			}
		},
	    legend: {
	        position: 'bottom'
	    }
	});
}
function get(info){
	for (var k=0; k<bookId.length;k++){
		for (var j = 1; j< info.length; j++){
			if (info[j][0]==bookId[k]){
				bookname[k]=new Array(5);
				bookname[k][0]=info[j][0];
				bookname[k][1]=info[j][1];
				bookname[k][2]=info[j][2];
				bookname[k][3]=info[j][3];
				bookname[k][4]=info[j][4];
			}
		}
	}
	console.log(bookname);
	table();
}

function gradeTable ( bookname ) {

	const tableHead = `
		<table >
			<thead>
				<tr class='highlight-row'>
					<th>Book ID</th>
					<th>Book Name</th>
					<th>Author Name</th>
					<th>Year released</th>
					<th>Price in $</th>
				</tr>
			</thead>
			<tbody>
	`;

	const tableFoot = `
			</tbody>
		</table>
	`;

	for ( let i = 0; i < bookname.length; i += 1 ) {

		let id = bookname[i][0];
		let title = bookname[i][1];
		let author = bookname[i][2];
		let year = bookname[i][3];
		let price = bookname[i][4];
		tableBody += `
			<tr>
				<td>${id}</td>
				<td>${title}</td>
				<td>${author}</td>
				<td>${year}</td>
				<td>${price}</td>
			</tr>
		`
	}
	return tableHead + tableBody + tableFoot;
}
function table(){
document.querySelector('.tab')
	.insertAdjacentHTML(
		'afterbegin',
		gradeTable( bookname)
	)}

	function processForm()
	{
	  var val = location.search.substring(1).split("&");
	  var temp = val[0].split("=");
	  user = unescape(temp[1]);
	  if (user>0 && user<6){
		parseData(createGraph);
	  }else{
		alert("Enter number between 1-5");
		 window.location.href="index.html";
	  }
	}
	if (state){
		processForm();
	}

function graphdisplay(){
	
		ty='';
		document.getElementById("grp").value="Bar Chart";
	
	state=false;
	bookname=[];
	bookId= [];
	rating = ["ratings"];
	id=[];
	tableBody='';
	document.querySelector('.tab').innerHTML="";
	parseData(createGraph);

}
