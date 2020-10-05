function buildTreeView(treeModel) {
    // set the dimensions and margins of the graph
    var width = "900"
    var height = "460"

    $("#my_dataviz").empty();
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(10,0)"); // bit of margin on the left = 40

    // Create the cluster layout:
    var cluster = d3.tree()
        .size([height, width - 100]); // 100 is the margin I will have on the right side

    // Give the data to this cluster layout:
    var root = d3.hierarchy(treeModel, function(d) {
        return d.children;
    });
    cluster(root);

    let handledData = handleData(root.descendants().slice(1));
    console.log("root.descendants().slice(1)", handledData)

    // Add the links between nodes:
    svg.selectAll('path')
        .data(handledData)
        .enter()
        .append('path')
        // .attr("d", function(d) {
        //     return "M" + d.y + "," + d.x +
        //         "C" + (d.parent.y + 50) + "," + d.x +
        //         " " + (d.parent.y + 150) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
        //         +
        //         " " + d.parent.y + "," + d.parent.x;
        // })
        .attr("d", function(d) {
            return "M" + d.y + "," + d.x +
                "C" + (d.parent.y + 50) + "," + d.x +
                " " + (d.parent.y + 150) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
                +
                " " + d.parent.y + "," + d.parent.x;
        })
        .style("fill", 'none')
        .attr("stroke", function(d) {
            if (d.data.name === "boss1") {
                return "#fc4242"
            }
            return "#9a9a9a";
        })
        .attr("stroke-width", function(d) {
            if (d.data.name === "boss1") {
                return "2"
            }
            return "1";
        })

    // Add a circle for each node.
    svg.selectAll("g")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")"
        })
        .append("circle")
        .attr("r", 4)
        .style("fill", "#8db9e4")
        .style("stroke-width", 2)
        .attr('cursor', 'pointer')
        .on('click', click);

    svg.selectAll("g")
        .append("text")
        .attr("font-size", "1.2rem")
        .attr("dy", "-0.4rem")
        .attr("dx", "15")
        .attr("text-anchor", "middle")
        .text(d => d.data.name)
        .attr('cursor', 'pointer')
        .on('click', click);

    svg.selectAll('g')
        .selectAll('text')
        .attr("fill", function(d) {
            if (d.data.name === "B") {
                return "#fc4242"
            }
            return "#9a9a9a";
        })


    // Toggle children on click.
    function click(node) {
        console.log(node)

        svg.selectAll('g')
            .selectAll('text')
            .attr("fill", function(d) {
                if (d.data.name === node.data.name) {
                    return "#3680f6"
                }
                return "#9a9a9a";
            })

        nodeFormService.displayForm(node.data, node.parent === (undefined || null) ? undefined : node.parent.data);

    }

    function setTestNodeAttrById(id, attrName, attrValue) {
        svg.selectAll('g')
            .selectAll('text')
            .attr(attrName, function(d) {
                if (d.data.name === id) {
                    return attrValue
                }
                return;
            })
    }

    setTestNodeAttrById("B", "font-weight", "900");
}