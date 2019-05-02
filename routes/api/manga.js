const express = require("express");
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');



// @routes  GET api/manga/test
// @desc    Test manga route
// @access  public
router.get("/test", (req, res) => {
    res.json({ msg: "Manga Works!" });
});

// @routes  POST api/manga/
// @desc    Get all manga
// @access  public
router.post("/", (req, res) => {
    const page = req.body.page;
    const errors={};
   axios.get(`https://www.mangaeden.com/api/list/0/?p=${page}&l=100`)
        .then(data => {
            res.json(data.data);
        })
        .catch(err => {
            errors.chapter = err.response.statusText;
            
            res.status(err.response.status).json(errors)
            // console.log(err.response.status)
        })
});

// @routes  POST api/manga/id
// @desc    Get manga
// @access  public
router.post("/id", (req, res) => {
    const id = req.body.id;
    const errors={};
   axios.get(`https://www.mangaeden.com/api/manga/${id}`)
        .then(data => {
            res.json(data.data);
        })
        .catch(err => {
            errors.chapter = err.response.statusText;
            
            res.status(err.response.status).json(errors)
            // console.log(err.response.status)
        })
});

// @routes  POST api/manga/id/chapter
// @desc    Get manga chapters
// @access  public
router.post("/id/chapter", (req, res) => {
    const id = req.body.id;
    const errors={};
   axios.get(`https://www.mangaeden.com/api/chapter/${id}`)
        .then(data => {
            res.json(data.data);
        })
        .catch(err => {
            errors.chapter = err.response.statusText;
            
            res.status(err.response.status).json(errors)
            // console.log(err.response.status)
        })
});



module.exports = router;