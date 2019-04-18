console.log("Welcome to our Dashboard, We are getting data from MYSQL  database and generating Javascript Plotly!!");

let plot1_url = `/default/bygender`;
let plot2_url = `/default/sept_delays`;
let plot_age = `/api/age_bal`;
let plot_pop = `/population/summary`;
let plot_bill = `/bill/payment`;

function byGender(){
  d3.json(plot1_url).then((data) => { 
    console.log(data);
    // create a gender array

    const gender = [];

    gender.push('female')
    gender.push('male')

    const total_cc_default = [];
    total_cc_default.push(data[0]['total_num_CC_default'])
    total_cc_default.push(data[1]['total_num_CC_default'])

    console.log(total_cc_default);
    // console.log(data);
  var pieData = [
    {
      values: total_cc_default, 
      labels: gender,
      hovertext: gender,
      hoverinfo: "hovertext",
      marker:{
        colors: ['#E1396C','#96D38C']
      },
      type: "pie"
    }
  ];

  var pieLayout = {
    title: 'Credit Card Default status (by Gender)',
    //title: 'HYPOTHESIS: Men are more likely to experience a credit card default',
    titleposition:'middle center',
    margin: { t: 35, l: 0 }
  };

  Plotly.plot("pie", pieData, pieLayout,{displayModeBar: false});
  console.log("*******");
});
}

function sept_delayedPayments(){
  d3.json(plot2_url).then((data) => {
    console.log(data);
    const num_acc=[];
    const months =[];
    for(var i=0; i<data.length;i++){
      num_acc.push(data[i]['number_of_accounts'])
      months.push(data[i]['months_delayed_since_Sept'])
    }
    console.log('this is num_acc', num_acc);

    var layout = {
      margin:{t:35},
      title: 'Deliquent Payments_ September',
      titleposition:'middle center',
      hovermode:"closest",
      xaxis:{title:"Number of Months delayed"}, 
      yaxis:{title:"Number of Accounts"}
    };
    
    var data = [{
      x: months,
      y: num_acc, 
      type: 'bar',
      mode: "markers",
      marker: {
        colorscale: "Portland"
      }
    }];
    Plotly.newPlot("bar", data, layout,{displayModeBar: false})      
});     
}

function plotAge(){
  d3.json(plot_age).then((data)=>{
  console.log(data)

  const age_grp = [];
  const avg_credit = [];

  for(var i=0; i<data.length; i++)
  {
    age_grp.push(data[i]['age'])
    avg_credit.push(data[i]['avg_credit_granted'])
  }

  var layout = {
    margin:{t:35},
    title: 'Average Credit Amount Granted(by Age Group)',
    //title:'HYPOTHESIS: Age plays a factor in the amount of credit granted to an individual',
    titleposition:'middle center',
    hovermode:"closest",
    xaxis:{title:"Age Group"}, 
    yaxis:{title:"Average Credit Granted"}
  };
  var data = [{
    x: age_grp,
    y: avg_credit, 
    type: 'line',
    // text: x,
    //mode: 'lines'
  }];
  Plotly.newPlot("line", data, layout,{displayModeBar: false}); 
  });
  
}


function pop_sum(){
  d3.json(plot_pop).then((data)=>{
  console.log(data)

  const age = [];
  const num_recs = [];

  for(var i=0;i<data.length;i++)
  {
    age.push(data[i]['age'])
    num_recs.push(data[i]['number_of_records'])
  }

  var layout = {
    margin:{t:35},
    titleposition:'middle center',
    title: 'Credit Card holders (Age Group)',
    //title:'HYPOTHESIS: Credit cards are used mainly by adults in their 30s & 40s',
    hovermode:"closest",
    xaxis:{title:"Age Group"}, 
    yaxis:{title:"Number of Records"}
  };
  var trace1 = {
    x: age,
    y: num_recs, 
    // mode: 'markers',
    type: 'line'
  };
  var data = [trace1];

  Plotly.newPlot("bubbles", data, layout,{displayModeBar: false});
  });
}

function bill_summary(){
  d3.json(plot_bill).then((data)=>{
  console.log(data)

  const bill_amt = [];
  const pay_amt = [];
  const months = ['September', 'August', 'July', 'June', 'May', 'April'];

  for(var i=0;i<data.length;i++)
  {
    bill_amt.push(data[i]['a_Sept']) //Sept_bill
    bill_amt.push(data[i]['b_Aug'])//Aug_bill
    bill_amt.push(data[i]['c_July'])//July_bill
    bill_amt.push(data[i]['d_June'])//June_bill
    bill_amt.push(data[i]['e_May'])//May_bill
    bill_amt.push(data[i]['f_April'])//Apr_bill

    pay_amt.push(data[i]['g_Sept'])//Sept_pay'
    pay_amt.push(data[i]['h_Aug'])//Aug_pay
    pay_amt.push(data[i]['i_July'])//July_pay
    pay_amt.push(data[i]['j_June'])//June_pay
    pay_amt.push(data[i]['k_May'])//May_pay'
    pay_amt.push(data[i]['l_April'])//Apr_pay
  }
  console.log(pay_amt);
  console.log(bill_amt);

  var layout = {
    barmode:'group',
    bargap: 0.15,
    bargroupgap: 0.1,
    margin:{t:35},
    titleposition:'middle center',
    title: 'Credit Card Bill Statement vs Credit Card Payment',
    //title:'HYPOTHESIS: The total sum of credit card bills ARE NOT paid in full on a monthly basis',
    hovermode:"closest",
    xaxis:{title:"Month"}, 
    yaxis:{title:"Bill Statement / Bill Payment"}
  };

  var trace1 = {
    x: months,
    y: bill_amt, 
    name:'Bill Statement',
    marker: {color: 'rgb(158, 202, 225)'},
    type: 'bar'
  };

  var trace2 = {
    x: months,
    y: pay_amt, 
    name: 'Pay Amount',
    marker: {color: 'rgb(58, 200, 225)'},
    type: 'bar'
  };

  var data = [trace1, trace2];

  Plotly.newPlot("bar_a", data, layout,{displayModeBar: false});
  });
}



 function init() {
   byGender();
   sept_delayedPayments();
   plotAge();
   pop_sum();
   bill_summary();
 }

 init();
