(function () {
    "use strict";

    var serialize = require('serialization');

    // First, define a function that creates a fresh  (untrained) classifier.
    // This code should be stand-alone - it should include all the 'require' statements
    //   required for creating the classifier.
    function newClassifierFunction() {
        var limdu = require('limdu');

        // Initialize a classifier with a feature extractor:
        return new limdu.classifiers.multilabel.BinaryRelevance({
            binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
        });
    }

    // Use the above function for creating a new classifier:
    var intentClassifier = newClassifierFunction();

    var examplePoints1 = [
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.CHWBV_POS",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.CHWV_FBK",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.CHW_PD_FILT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.C_EN",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.DEH_LOAD",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.EFF_OCC",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.FLT_PD_FILT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.MA_T",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.MOAD_FBK",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_CO2",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_CO2D",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_DP",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_H",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_T",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.R_AT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.R_HT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.R_LT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SAF_FBK",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SAF_RI",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_PS_FILT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_PS_SP",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_SPC",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_T",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.VAV_ATL",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.VAV_HTL",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.VAV_LTL",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.ZN01_LEN"
    ];

    var examplePoints2 = [
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.CHWBV_POS",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.CHWV_FBK",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.CHW_PD_FILT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.C_EN",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.DEH_LOAD",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.EFF_OCC",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.FLT_PD_FILT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.MA_T",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.MOAD_FBK",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_CO2",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_CO2D",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_DP",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_H",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.RA_T",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.R_AT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.R_HT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.R_LT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SAF_FBK",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SAF_RI",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_PS_FILT",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_PS_SP",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_SPC",
        "DMAVISTA-LNS-DMA-Channel3-AH1_03_01-$LOG.SA_T"
    ];

    var trainInputObj = {"ahu":1};
    var testCaseInputObj = {"ahu":1};
    var i;

    for(i=0; i<examplePoints2.length; i++) {
        testCaseInputObj[examplePoints2[i].split(".")[1]] = 1;
    }

    for(i=0; i<examplePoints1.length; i++) {
        trainInputObj[examplePoints1[i].split(".")[1]] = 1;
    }

    var trainOutputList1 = ["chilledWaterCool", "return", "mixed", "vav", "discharge"];
    var trainOutputList2 = ["chilledWaterCool", "return", "mixed", "discharge"];

    intentClassifier.trainBatch([
        {input: trainInputObj, output: trainOutputList1},
        {input: testCaseInputObj, output: trainOutputList2}
    ]);

    console.log("Original Classifier:")
    console.dir(intentClassifier.classify({ahu:1}));

    var serialized = serialize.toString(intentClassifier, newClassifierFunction);

    var copyClassifier = serialize.fromString(serialized, __dirname);

    console.log("De-Serialized Classifier:")
    console.dir(copyClassifier.classify({ahu:1, VAV_HTL:1}));
})();
