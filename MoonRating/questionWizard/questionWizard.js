const $engagementChooseBlock = $('.card');
const engagementChooseBlockCount = $('.card').length;
const $btnYes = $('.btn-yes-js');
const $btnNo = $('.btn-no-js');
const $btnPrevious = $('.btn-previous-js');

const cartIDs = {
    //question cards
    projectDurationOver6Months: "projectDurationOver6Months",
    fullTime: "fullTime",
    technicalSupportAndMinorUpdates: "technicalSupportAndMinorUpdates",
    projectDurationUnder2Months: "projectDurationUnder2Months",
    specification: "specification",
    changesExpected: "changesExpected",

    //result cards
    dedicatedTeam: "dedicated-team",
    supportPackage: "support-package",
    timeAndMaterials: "time-materials",
    fixedPrice: "fixed-price"
}

var cardsTree = {

    projectDurationOver6Months: {
        id: cartIDs.projectDurationOver6Months,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    fullTime: {
        id: cartIDs.fullTime,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    dedicatedTeam: {
        id: cartIDs.dedicatedTeam,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },

    technicalSupportAndMinorUpdates: {
        id: cartIDs.technicalSupportAndMinorUpdates,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    supportPackage: {
        id: cartIDs.supportPackage,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },

    projectDurationUnder2Months: {
        id: cartIDs.projectDurationUnder2Months,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    specification: {
        id: cartIDs.specification,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    changesExpected: {
        id: cartIDs.changesExpected,
        answer: undefined,

        finalNode: false,
        node_yes: undefined,
        node_no: undefined
    },

    timeAndMaterials: {
        id: cartIDs.timeAndMaterials,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },

    fixedPrice: {
        id: cartIDs.fixedPrice,
        answer: undefined,

        finalNode: true,
        node_yes: undefined,
        node_no: undefined
    },



    initTree() {
        this.projectDurationOver6Months.answer = undefined;
        this.projectDurationOver6Months.node_yes = this.fullTime;
        this.projectDurationOver6Months.node_no = this.projectDurationUnder2Months;

        this.fullTime.answer = undefined;
        this.fullTime.node_yes = this.dedicatedTeam;
        this.fullTime.node_no = this.technicalSupportAndMinorUpdates;

        this.technicalSupportAndMinorUpdates.answer = undefined;
        this.technicalSupportAndMinorUpdates.node_yes = this.supportPackage;
        this.technicalSupportAndMinorUpdates.node_no = this.timeAndMaterials;

        this.projectDurationUnder2Months.answer = undefined;
        this.projectDurationUnder2Months.node_yes = this.specification;
        this.projectDurationUnder2Months.node_no = this.timeAndMaterials;

        this.specification.answer = undefined;
        this.specification.node_yes = this.changesExpected;
        this.specification.node_no = this.timeAndMaterials;

        this.changesExpected.answer = undefined;
        this.changesExpected.node_yes = this.timeAndMaterials;
        this.changesExpected.node_no = this.fixedPrice;
    }
}


const treeEngine = {

    startNode: cardsTree.projectDurationOver6Months,

    findNextTreeNode: function() {

        let node = this.processTree(this.startNode);
        if (!node)
            throw "Node not found";
        return node;
    },

    processTree: function(node) {
        if (!node)
            throw "Node is not valid";

        if (node.finalNode)
            return node;

        if (node.answer == true) {
            return this.processTree(node.node_yes);
        }

        if (node.answer == false) {
            return this.processTree(node.node_no);
        }

        if (node.answer == undefined) {
            return node;
        }

        throw "Appropriate node not found";
    },

    getPreviousTreeNodeByChildId: function(childNodeId) {
        if (cardsTree.projectDurationOver6Months.node_yes.id === childNodeId ||
            cardsTree.projectDurationOver6Months.node_no.id === childNodeId)
            return cardsTree.projectDurationOver6Months;

        if (cardsTree.fullTime.node_yes.id === childNodeId ||
            cardsTree.fullTime.node_no.id === childNodeId)
            return cardsTree.fullTime;

        if (cardsTree.technicalSupportAndMinorUpdates.node_yes.id === childNodeId ||
            cardsTree.technicalSupportAndMinorUpdates.node_no.id === childNodeId)
            return cardsTree.technicalSupportAndMinorUpdates;

        if (cardsTree.projectDurationUnder2Months.node_yes.id === childNodeId ||
            cardsTree.projectDurationUnder2Months.node_no.id === childNodeId)
            return cardsTree.projectDurationUnder2Months;

        if (cardsTree.specification.node_yes.id === childNodeId ||
            cardsTree.specification.node_no.id === childNodeId)
            return cardsTree.specification;

        if (cardsTree.changesExpected.node_yes.id === childNodeId ||
            cardsTree.changesExpected.node_no.id === childNodeId)
            return cardsTree.changesExpected;

        return childNodeId;
    },

    setNodeAnswerByNodeId: function(id, answer) {
        if (cardsTree.projectDurationOver6Months.id === id)
            cardsTree.projectDurationOver6Months.answer = answer;

        if (cardsTree.fullTime.id === id)
            cardsTree.fullTime.answer = answer;

        if (cardsTree.technicalSupportAndMinorUpdates.id === id)
            cardsTree.technicalSupportAndMinorUpdates.answer = answer;

        if (cardsTree.projectDurationUnder2Months.id === id)
            cardsTree.projectDurationUnder2Months.answer = answer;

        if (cardsTree.specification.id === id)
            cardsTree.specification.answer = answer;

        if (cardsTree.changesExpected.id === id)
            cardsTree.changesExpected.answer = answer;
    }
}

const contentWizardHelper = {
    showCardById: (id) => {
        console.log("showCard by id: " + id)
        $('.engagement-choose__block--current')
            .removeClass('engagement-choose__block--current');

        document.getElementById(id).classList.add('engagement-choose__block--current');
    }
}

const wizardControl = {
    contentWizardHelper: contentWizardHelper,
    currentCard: undefined,

    initWizard: function() {
        console.log("init wizard")
        cardsTree.initTree();
        this.currentCard = cardsTree.projectDurationOver6Months;
        contentWizardHelper.showCardById(this.currentCard.id);
    },

    nextCardExtended: function(answer) {
        treeEngine.setNodeAnswerByNodeId(this.currentCard.id, answer)
        this.currentCard = treeEngine.findNextTreeNode();
        contentWizardHelper.showCardById(this.currentCard.id);
    },

    previousExtended: function() {
        let previousNode = treeEngine.getPreviousTreeNodeByChildId(this.currentCard.id)
        console.log(previousNode)
        treeEngine.setNodeAnswerByNodeId(previousNode.id, undefined)
        this.currentCard = treeEngine.findNextTreeNode();
        contentWizardHelper.showCardById(this.currentCard.id);
    },
}
wizardControl.initWizard();


$btnYes.each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.nextCardExtended(true);
    })
})

$btnNo.each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.nextCardExtended(false);
    })
})

$btnPrevious.each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.previousExtended();
    })
})

$('.btn-again-js').each(function(i, btn) {
    $(btn).on('click', () => {
        wizardControl.initWizard();
    })
})