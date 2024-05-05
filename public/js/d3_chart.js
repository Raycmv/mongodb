//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default async function ChartBar (dataset){
    try{
        const w = 1100;
        const h = 400;
        const padding = 65;

        const xScale = d3.scaleTime([new Date(d3.min(dataset,(d)=> d.year ) - 1, 1, 1), new Date(d3.max(dataset, (d)=> d.year ) + 1, 1, 1)], [d3.min(dataset,(d)=> d.year), d3.max(dataset,(d)=> d.year)])
                                .range([padding, w - padding]);
        const yScale = d3.scaleLinear().domain([0.1, 12]).range([h - padding, padding]); 
            
            const svg = d3.select("#myChart")
                            .append("svg")
                            .attr("width", w)
                            .attr("height", h)
                            .style("background-color","#BFC3C9")
        
                        svg.selectAll("circle")
                            .data(dataset)
                            .enter()
                            .append("circle")
                            .attr("id",(d, i)=> i + 1)
                            .attr("cx", (d) => xScale(new Date(d.year, 0, 0, 0)))
                            .attr("cy", (d) => yScale(d.month))
                            .attr("r", 5)
                            .attr("fill", (d) => { if(d.active == 1){return "#AF1715"} else if(d.active == 2) { return "#50952A"} else{ return "#2317DD"}})
                            .attr("class","dot")
                            .attr("data-xvalue", (d)=> d.year)
                            .attr("data-yvalue", (d)=> d.month);
        
                        svg.append("g")
                            .attr("id","legend")
                            .attr("transform", "translate(694," + (h - 18) + ")")
                            .append("text")
                            .text("Legend: ")
                            .style("font-weight","bolder");
                            
                        svg.append("circle")
                            .attr("cx", () => xScale(new Date(2008, 11, 1, 1)))
                            .attr("cy", () => yScale(-1.8))
                            .attr("r", 8)
                            .attr("fill","#AF1715")
                        svg.append("circle")
                            .attr("cx", () => xScale(new Date(2011, 4, 1, 1)))
                            .attr("cy", () => yScale(-1.8))
                            .attr("r", 8)
                            .attr("fill","#50952A")
                        svg.append("circle")
                            .attr("cx", () => xScale(new Date(2013, 1, 1, 1)))
                            .attr("cy", () => yScale(-1.8))
                            .attr("r", 8)
                            .attr("fill","#2317DD")
            
                        svg.append("text")
                            .text("Less active")
                            .attr("x", () => xScale(new Date(2009, 3, 1, 1)))
                            .attr("y", () => yScale(-2))
                        svg.append("text")
                            .text("Active")
                            .attr("x", () => xScale(new Date(2011, 8, 1, 1)))
                            .attr("y", () => yScale(-2))
                        svg.append("text")
                            .text("More Active")
                            .attr("x", () => xScale(new Date(2013, 5, 1, 1)))
                            .attr("y", () => yScale(-2))
                            
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale).tickFormat(formMonth);
                        svg.append("g")
                            .attr("id","x-axis")
                            .attr("transform", "translate(0," + (h - padding) + ")")
                            .call(xAxis);
                        svg.append("g")
                            .attr("id","y-axis")
                            .attr("transform", "translate(" + padding + ", 0)")
                            .call(yAxis);
    } catch(error) {
        console.error('Error al importar d3:', error);
    }
    
};

function formMonth(num) {
    const month = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return month[num - 1];
}