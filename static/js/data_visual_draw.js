$('h3.text-secondary mb-0:empty').hide();

  // to display the graphic pictures
  var svgWidth=800,svgHeight =600;

  var margin = {top: 40, right: 40, bottom: 40, left: 40},
      width = svgWidth- margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;
  
  var outRadius =  Math.min(svgWidth, svgHeight) / 2*0.6;
  var innerRadius=0;
  
  var svgChart=d3.select('.carousel-item').append('svg')
              .attr('width',svgWidth)
              .attr('height',svgHeight)
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   var xScale=d3.scaleOrdinal()
//               .range([0,width],.5)

//   var yScale=d3.scaleLinear()
//               .range([height,0])

//   var x_axis=d3.axisBottom(xScale)
//   var y_axis=d3.axisLeft(yScale)
//   var color = d3.scaleOrdinal(d3.schemeCategory10);

  //plot the data
  d3.json('api/gender').then(function(genderCountsData){
    console.log(`the gender data is ${genderCountsData[1]} `)
    console.log(`number is ${genderCountsData[1].Counts}, the gender is ${genderCountsData[1].gender}`)
    //apendx axes to the chart
    // var color = d3.scaleOrdinal()
    //             .domain(genderCountsData.map(d => d.gender))
    //             .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), genderCountsData.length).reverse())
    // var color=['red','blue']
    var color=d3.scaleOrdinal(d3.schemeCategory10);
    // svgChart.append('g')
    //         .call(x_axis)

    // svgChart.append('g')
    //         .call(y_axis)
    // var genderCountsData=[
    //     {'gender':'Male','Counts':111800},
    //     {'gender':'Female','Counts':121000}
    // ]
    // console.log(genderCountsData)

    var arcpath=d3.arc()
      .outerRadius(outRadius)
      .innerRadius(innerRadius)
    
    var pieValue =d3.pie()
                    .value(d=>d.Counts);

    var label = d3.arc()
                    .outerRadius(outRadius)
                    .innerRadius(outRadius);

    var arcs=svgChart.selectAll('g.arc')
                        .data(pieValue(genderCountsData))
                        .enter()
                        .append('g')
                        .attr('class','arc')
                        .attr('transform',`translate(${svgHeight/2},${svgWidth/2})`);
    // draw arc paths                    
    arcs.append('path')
        .attr('d', arcpath)
        .attr('fill',function(d,i){
            return color(i)
        })
                        // .append("title")
                        // .text(d => `${d.data.gender}: ${d.data.Counts}`);
    
    var text=arcs.append('text')
                    .attr("transform", function(d) { 
                        return "translate(" + arcpath.centroid(d) + ")"; 
                    })
                    .attr("text-anchor", "middle")
                    .text(function(d){ 
                        return `${d.data.gender}:  ${d.data.Counts}`; 
                    })
                    .style('fill','white');        
  })
