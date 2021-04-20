const express = require('express');
const router = express.Router();
const {blockQuestion,validateQuestion} = require('../models/questions/block');
const {blockMatchQuestion,validateMatchQuestion} = require('../models/questions/blockMatch');
const path = require('path');

//----------------------Block Arrangement Start---------------------------//
router.get('/getBlockQuestions',async(req,res)=>{
    const question = await blockQuestion.find({});
    if(!question) return res.status(404).end();
    res.send(question);
});

router.post('/addBlock',async (req,res)=>{
    const {error} = validateQuestion(req.body);
    if(error) return res.status(400).send(error.message);

    const {statement,answer,options,explanation} = req.body;

    const question = new blockQuestion();
    question.statement = statement;
    question.answer = answer;
    question.options = options;
    question.explanation = explanation;

    await question.save();

    res.send("Saved!");
});

router.get('/block/:id',async (req,res)=>{
    const question = await blockQuestion.findOne({_id:req.params.id}).select('-answer');
    if(!question) return res.status(404).end();

    res.sendFile(path.join(__dirname + '/../public/demo/question-view.html'));
});

router.post('/block/:id',async (req,res)=>{
    const question = await blockQuestion.findOne({_id:req.params.id});
    if(!question) return res.status(404).end();

    if(!req.body.answer) return res.status(400).end();
    const receivedAns = req.body.answer;
    if(receivedAns===question.answer){
        res.send("Correct Answer!");
    }
    else{
        res.send("Oops! Wrong Answer! Try again");
    }
});

router.get('/block/data/:id',async (req,res)=>{
    const question = await blockQuestion.findOne({_id:req.params.id}).select('-answer');
    if(!question) return res.status(404).end();

    res.send(question);
});


//--------------------Block Arrangement End------------------------//


//--------------------Block Matching Start..........................//

router.get('/getBlockMatchQuestions',async(req,res)=>{
    const question = await blockMatchQuestion.find({});
    if(!question) return res.status(404).end();

    res.send(question);
});

router.post('/addBlockMatch',async (req,res)=>{
    const {error} = validateMatchQuestion(req.body);
    if(error) return res.status(400).send(error.message);

    const {statement,answer,questionBlocks,explanation} = req.body;

    const question = new blockMatchQuestion();
    question.statement = statement;
    question.answer = answer;
    question.questionBlocks = questionBlocks;
    question.explanation = explanation;

    await question.save();

    res.send("Saved!");
});

router.get('/blockMatch/:id',async (req,res)=>{
    const question = await blockMatchQuestion.findOne({_id:req.params.id}).select('-answer');
    if(!question) return res.status(404).end();

    res.sendFile(path.join(__dirname + '/../public/demo/question-view-Match.html'));
});


router.post('/blockMatch/:id',async (req,res)=>{
    const question = await blockMatchQuestion.findOne({_id:req.params.id});
    if(!question) return res.status(404).end();

    if(!req.body.answer) return res.status(400).end();
    const receivedAns = req.body.answer;
    console.log(receivedAns,question.answer);
    if(receivedAns==question.answer.join(" ")){
        res.send("Correct Answer!");
    }
    else{
        res.send("Oops! Wrong Answer! Try again");
    }
});

router.get('/blockMatch/data/:id',async (req,res)=>{
    const question = await blockMatchQuestion.findOne({_id:req.params.id});
    if(!question) return res.status(404).end();

    question.answer = question.answer.sort(() => Math.random() - 0.5);
    res.send(question);
});

//-------------------Block Matching End-----------------------------//
module.exports = router;
