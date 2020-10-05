function testCall() {
    console.log("test call")
}


function initTree() {

    let project6Month = {
        id: "project6Month",
        name: "Project duration over 6 month",
        children: []
    }

    let fullTime = {
        id: "fullTime",
        name: "Fulltime",
        children: []
    }

    let dedicatedTeam = {
        id: "dedicatedTeam",
        name: "DedicatedTeam",
        children: []
    }

    let technicalSupport = {
        id: "changesExpected",
        name: "TechnicalSupport",
        children: []
    }

    let supportPackage = {
        id: "supportPackage",
        name: "SupportPackage",
        children: []
    }

    let project2Month = {
        id: "projectUnder2Month",
        name: "durationUnder2Month",
        children: []
    }

    let specification = {
        id: "specification",
        name: "specification",
        children: []
    }

    let changesExpected = {
        id: "changesExpected",
        name: "changesExpected",
        children: []
    }

    let timeMaterial = {
        id: "timeMaterial",
        name: "TimeMaterial",
        children: []
    }

    let fixedPrice = {
        id: "fixedPrice",
        name: "FixedPrice",
        children: []
    }


    project6Month.children.push(fullTime)
    project6Month.children.push(project2Month)

    fullTime.children.push(technicalSupport)
    fullTime.children.push(dedicatedTeam)

    technicalSupport.children.push(supportPackage)
    technicalSupport.children.push(timeMaterial)

    project2Month.children.push(specification);
    project2Month.children.push(timeMaterial);

    specification.children.push(timeMaterial)
    specification.children.push(changesExpected)

    changesExpected.children.push(timeMaterial)
    changesExpected.children.push(fixedPrice)


    let nodeList = [];
    nodeList.push(project6Month);
    nodeList.push(fullTime);
    nodeList.push(dedicatedTeam);
    nodeList.push(technicalSupport);
    nodeList.push(supportPackage);
    nodeList.push(project2Month);
    nodeList.push(specification);
    nodeList.push(changesExpected);
    nodeList.push(timeMaterial);
    nodeList.push(fixedPrice);

    return { rootNode: project6Month, nodeList };
}

function addNode(nodeList, parentId, nodeModel) {
    let resultModel = {
        nodeList: nodeList,
        success: false,
        error: ""
    }

    if (!parentId || !nodeModel || !nodeList) {
        resultModel.error = "Node model not valid!"
        return resultModel;
    }

    let parentNode = nodeList.find(node => {
        return node.id === parentId
    })

    if (!parentNode) {
        resultModel.error = "Parent node not found!"
        return resultModel;
    }

    nodeList.push(nodeModel)
    parentNode.children.push(nodeModel);

    resultModel.success = true;
    return resultModel;
}

function getRootNode(nodeList) {
    if (!nodeList)
        throw "nodeList not valid"

    let rootNode = nodeList.find(node => {
        return node.children.length === 0;
    })

    nodeList.forEach(node => {
        let childrenFound = false;
        nodeList.forEach(innerNode => {
            if (innerNode.children.find(x => { return x.id === node.id }))
                childrenFound = true;
        })
        if (!childrenFound) {
            rootNode = node;
            return node;
        }
    });

    if (!rootNode)
        throw "Root not found"

    return rootNode;
}